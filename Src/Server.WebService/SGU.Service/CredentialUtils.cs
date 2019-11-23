using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.Security;

namespace SGU.Service
{
    public static class CredentialUtils
    {
        static int MinRequiredPasswordLengthLimited = 9;
        static int PasswordKeySizeInBits = 160;
        static int PasswordKeySize = PasswordKeySizeInBits / 8;

        public static void GeneratePasswordSalt(string password, out string newPasswordHash, out string newPasswordSalt)
        {
            newPasswordSalt = GeneratePasswordSalt();
            byte[] password1 = CryptographyUtil.StringToBytes(password);
            newPasswordHash = EncryptPassword(password1, newPasswordSalt);
        }
        static string GeneratePasswordSalt()
        {
            int passwordSaltLength = (MinRequiredPasswordLengthLimited + 1) / 2;
            byte[] salt = CryptographyUtil.GeneratePasswordSalt(passwordSaltLength);
            return BytesToString(salt);
        }
        public static string BytesToString(byte[] bytes)
        {
            return CryptographyUtil.HexaStringEncoding.GetString(bytes);
        }
        public static byte[] StringToBytes(string value)
        {
            return CryptographyUtil.HexaStringEncoding.GetBytes(value);
        }
        public static string EncryptPassword(byte[] password, string saltEncodedString)
        {
            byte[] passwordSalt = StringToBytes(saltEncodedString);    // Decode string to bytes
            byte[] passwordKey = CryptographyUtil.DerivePasswordKey(password, passwordSalt, PasswordKeySize);
            byte[] passwordHash = new byte[0];
            passwordHash = CryptographyUtil.SHA1EncryptPassword(passwordKey);
            string result = BytesToString(passwordHash); // Encode bytes to string
            return result;
        }
        internal static string GenerateToken(long sessionId, TimeSpan timeout, bool isAdmin = true)
        {
            var expireTimeUtc = DateTime.UtcNow.Add(timeout);

            var mem = new MemoryStream();
            using (var w = new BinaryWriter(mem))
            {
                w.Write(sessionId);
                w.Write(expireTimeUtc.Ticks);
                w.Write(isAdmin);

                // writes upto 8 random bytes
                var rng = RNGCryptoServiceProvider.Create();
                var rndBytes = new byte[1];
                rng.GetBytes(rndBytes);
                var numberOfRandomBytes = (int)Math.Ceiling(((double)rndBytes[0] / byte.MaxValue) * 8);
                if (numberOfRandomBytes > 0)
                {
                    rndBytes = new byte[numberOfRandomBytes];
                    rng.GetBytes(rndBytes);
                    w.Write(rndBytes);
                }
            }

            var buff = MachineKey.Protect(mem.ToArray(), "UsrSssn");
            return Base62.FromBytes(buff);
        }
        internal static string GenerateTokenEx(long sessionId, TimeSpan timeout, long uid, bool isAdmin = true)
        {
            var expireTimeUtc = DateTime.UtcNow.Add(timeout);

            var mem = new MemoryStream();
            using (var w = new BinaryWriter(mem))
            {
                w.Write(sessionId);
                w.Write(expireTimeUtc.Ticks);
                w.Write(isAdmin);
                w.Write(uid);

                // writes upto 8 random bytes
                var rng = RNGCryptoServiceProvider.Create();
                var rndBytes = new byte[1];
                rng.GetBytes(rndBytes);
                var numberOfRandomBytes = (int)Math.Ceiling(((double)rndBytes[0] / byte.MaxValue) * 8);
                if (numberOfRandomBytes > 0)
                {
                    rndBytes = new byte[numberOfRandomBytes];
                    rng.GetBytes(rndBytes);
                    w.Write(rndBytes);
                }
            }

            var buff = MachineKey.Protect(mem.ToArray(), "UsrSssn");
            return Base62.FromBytes(buff);
        }
    }
    public class CryptographyUtil
    {
        private static readonly Encoding m_UnicodeEncoding = Encoding.GetEncoding(
            "utf-8",
            new EncoderReplacementFallback("?"),
            new DecoderReplacementFallback("?"));
        public static Encoding UnicodeEncoding
        {
            get { return m_UnicodeEncoding; }
        }

        public static byte[] StringToBytes(string s)
        {
            return UnicodeEncoding.GetBytes(s);
        }

        public static string BytesToString(byte[] bytes)
        {
            return UnicodeEncoding.GetString(bytes);
        }

        private static void FillZero(byte[] abyt)
        {
            for (int i = 0; i < abyt.Length; i++)
                abyt[i] = (byte)0;
        }

        public static byte[] GeneratePasswordSalt(int length)
        {
            byte[] result = new byte[length];
            FillZero(result);
            var rng = System.Security.Cryptography.RandomNumberGenerator.Create();
            rng.GetBytes(result);
            return result;
        }

        public static byte[] DerivePasswordKey(byte[] password, byte[] salt, int length)
        {
            var pdb = new System.Security.Cryptography.PasswordDeriveBytes(password, salt);
            byte[] passwordKey = pdb.GetBytes(length);
            return passwordKey;
        }

        /// <summary>
        /// Generate random password
        /// </summary>
        /// <returns>Format aaadddAAA</returns>
        public static byte[] GeneratePassword()
        {
            int len = 9;
            int p = 0;
            byte[] result = new byte[len];
            string alpha = "abcdefghijklmnopqrstuvwxyz";
            for (int i = 0; i < 3; i++, p++)
                result[p] = (byte)RandomChar(alpha);
            for (int i = 0; i < 3; i++, p++)
                result[p] = (byte)RandomChar("0123456789");
            for (int i = 0; i < 3; i++, p++)
                result[p] = (byte)RandomChar(alpha.ToUpper());
            System.Diagnostics.Debug.Assert(p == len);
            return result;
        }

        private static readonly Random m_Random = new Random();

        private static char RandomChar(string pattern)
        {
            return pattern[m_Random.Next(pattern.Length)];
        }

        /// <summary>
        /// Compute passwordHash from passwordKey(pass+salt) using MD5
        /// </summary>
        /// <param name="passwordKey">Password+salt</param>
        /// <returns>Password hash</returns>
        public static byte[] MD5EncryptPassword(byte[] passwordKey)
        {
            var md5 = new System.Security.Cryptography.MD5CryptoServiceProvider();
            byte[] passwordHash = md5.ComputeHash(passwordKey);
            return passwordHash;
        }

        public static string HashMD5(string source)
        {
            byte[] bytes = UnicodeEncoding.GetBytes(source);
            byte[] hash = MD5EncryptPassword(bytes);
            return HexaStringEncoding.GetString(hash);
        }

        /// <summary>
        /// Compute passwordHash from passwordKey(pass+salt) using SHA1
        /// </summary>
        /// <param name="passwordKey">Password+salt</param>
        /// <returns>Password hash</returns>
        public static byte[] SHA1EncryptPassword(byte[] passwordKey)
        {
            var sha1 = new System.Security.Cryptography.SHA1CryptoServiceProvider();
            byte[] passwordHash = sha1.ComputeHash(passwordKey);
            return passwordHash;
        }

        /// <summary>
        /// Encode and decode between byte[] and string in Hexadecimal string format
        /// <todo>Implement System.ArgumentException</todo>
        /// </summary>
        public class HexaStringEncoding
        {
            /// <summary>
            /// Decode hexa string to bytes
            /// </summary>
            public static byte[] GetBytes(string s)
            {
                int len = s.Length;
                byte[] result = new byte[len / 2];
                try
                {
                    for (int i = 0, j = 0; j < len; i++, j += 2)
                    {
                        result[i] = byte.Parse(s.Substring(j, 2), System.Globalization.NumberStyles.HexNumber);
                    }
                }
                catch { }
                return result;
            }

            /// <summary>
            /// Encode hexa string from bytes
            /// </summary>
            public static string GetString(byte[] bytes)
            {
                StringBuilder s = new StringBuilder();
                foreach (byte b in bytes)
                {
                    s.Append(b.ToString("x2"));
                }
                return s.ToString().ToLower();
            }
        }
    }

}
