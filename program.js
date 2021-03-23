//====================================
//
//Youtube埋め込みジェネレーター
//Toshihide Iizuka
//
//2021/03/22
//
//====================================

//Main

//init
function init() {
    var params = (new URL(document.location)).searchParams;
    const url = removehtml(params.get("url"));
    var urlform = document.getElementById("url");
    urlform.value = url;
}
        
//URL生成
function generate() {    
    var urlform = document.getElementById("url");
    var getembed = youtubeembed(urlform.value);
    
    //結果出力
    var resultform = document.getElementById("result");
    resultform.value = getembed;

    var text = "<div class='balloon1-left'><p>" + getembed + "</p></div>";

    var chat = document.getElementById('chat');
    chat.innerHTML = text + chat.innerHTML;
    
}

//コピー

function copy() {
    var resultform = document.getElementById("result");
    
    if ( resultform.value != "" ) {
        // コピー
        document.execCommand(resultform.value);
    }
}

//Youtube埋め込みEmbed生成
function youtubeembed(geturl) {
    //参考
    //<iframe width="560" height="315" src="https://www.youtube.com/embed/Y9sbgjPipZg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    
    var defaulttext = "<iframe src=\"¥¥URL¥¥\" title=\"YouTube video player\" width=\"560\" height=\"315\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
    var videoid = "";
    var listid = "";
    var url = "";
    
    if ( geturl != "" ) {    
        //https://がない場合
        if ( !geturl.match("https://") ) {
            geturl = "https://" + geturl;
        }

        //https://www.youtube.com/watch?v=/リンクの場合
        if ( geturl.match("https://www.youtube.com/watch?v=")) {
            videoid = geturl.replace("https://www.youtube.com/watch?v=", "");
        }

        //https://youtu.be/リンクの場合
        if ( geturl.match("https://youtu.be/")) {
            videoid = geturl.replace("https://youtu.be/", "");
        }

        //https://www.youtube.com/playlist?list=リンクの場合
        if ( geturl.match("&list=")) {
            listid = geturl.split("&list=")[1];
            videoid = geturl.split("&")[0].replace("https://www.youtube.com/watch?v=", "");;
        }
        
        //URL生成
        if ( listid != "" ) {
        //URL:https://www.youtube.com/embed/videoseries?list=
            url = "https://www.youtube.com/embed/videoseries?list=" + listid + "&loop=1&playlist=" + videoid;

            //関連動画の非表示 ?rel=0
            url = url + "&rel=0";

            //Autoplay ?autoplay=1
            url = url + "&autoplay=1";
        } else {
        //URL:https://www.youtube.com/embed/VIDEO_ID
            url = "https://www.youtube.com/embed/" + videoid;
        }
        
        return defaulttext.replace("¥¥URL¥¥",url);
    }
}
        
function removehtml(str) {
    return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
}