export const _fetch = async (url, type, data = null) => {
  try{
    console.log("api called: " +url);    
    var response = await fetch(url, {
      method: type,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',       
      },
      body: data != null ? JSON.stringify(data) : ""
    });
    if (response != null)
    {
        return (await response.json());
    }
    else{
      return {
        status: 500,
        code: 500,
        message: "Lỗi server"
      };
    } 
  }catch(e){
    console.log(JSON.stringify(e));
  }
    
}
