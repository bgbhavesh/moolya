/**
 * Created by venkatasrinag on 21/2/17.
 */
export async function multipartFormHandler(data, url, file) {
    // if(!file)
    //     return  false;

    let formdata = new FormData();
    formdata.append('data', JSON.stringify(data));
    if(file)
        formdata.append('file', file);

    const result = await new Promise(function (resolve, reject) {
        // Make ajax call
        let filexmlhttp;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            filexmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            filexmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if(filexmlhttp){
            filexmlhttp.open('POST', url, true);
            filexmlhttp.setRequestHeader("enctype", "multipart/form-data");
            filexmlhttp.onreadystatechange = function() {
                if (filexmlhttp.readyState === 4 && filexmlhttp.status === 200) {
                    resolve(filexmlhttp.response);
                }
            }
            filexmlhttp.send(formdata)
        }
    })

    console.log(result)
    const id = result.data;
    return id
}
