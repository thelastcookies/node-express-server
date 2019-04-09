function setCookie(c_name, value, expiredays)
{
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + encodeURIComponent(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString() + "; Domain=localhost; path=/;");
}

function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        let c_start = document.cookie.indexOf(c_name + "=")
        // if (!=c_start)
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            let c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
                c_end = document.cookie.length;
            return decodeURIComponent(document.cookie.substring(c_start, c_end));
        }
    }
    return ""
}

function clearCookie ()
{
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (let i = keys.length; i--;)
            document.cookie = keys[i] + '=;expires=' + new Date(0).toUTCString()
                + "; Domain=localhost; path= /";
    }
}

// let Cookie = {};
//
// Cookie.setCookie = function (c_name, value, expiredays) {
//     let exdate = new Date();
//     exdate.setDate(exdate.getDate() + expiredays);
//     document.cookie = c_name + "=" + encodeURIComponent(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
//
// }
//
// Cookie.getCookie = function(c_name)
// {
//     if (document.cookie.length > 0)
//     {
//         let c_start = document.cookie.indexOf(c_name + "=")
//         // if (!=c_start)
//         if (c_start != -1)
//         {
//             c_start = c_start + c_name.length + 1;
//             let c_end = document.cookie.indexOf(";", c_start);
//             if (c_end == -1)
//                 c_end = document.cookie.length;
//             return decodeURIComponent(document.cookie.substring(c_start, c_end));
//         }
//     }
//     return ""
// }
//
// module.exports = Cookie;
