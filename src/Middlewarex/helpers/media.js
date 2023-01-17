import $ from 'jquery';

export function isVideo(url){
  return (url && url.toString().match(/\.(avi|mp4|mpg|wmv|gifv|mkv|webm|3gp)$/) != null);
}

export function isYoutube(val){
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
  var match = val ? val.toString().match(regExp) : '';
  if (match && match[2].length == 11) {
    return true;
  }
}

export function isVimeo(url){
  var regExp2 = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i;
  var match2 = url ? url.toString().match(regExp2) : '';
  if (match2){
    return true;
  }
}

export function isImage(typecode){
  if(typecode) {
      var ext = typecode.split('.').pop();
      ext = ext ? ext.toLowerCase() : '';
      if(/[\/.](gif|jpg|jpeg|tiff|png)$/i.test(typecode) || /^data:image/i.test(typecode))
      {
          return true
      }
  }
  return false;
}


export function getYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

export function isTypeFile(typeFile) {
  var data = '';
  if((typeFile && typeFile.toString().match(/./g) || []).length > 0){
    data = typeFile.toString().split('.');
    data = data[data.length - 1];
  }
  return data;
}

export async function callVimeoImage(vimeoVideoID,id){
  let videoImg =""
  await $.getJSON('https://vimeo.com/api/v2/video/' + vimeoVideoID + '.json', {format: "json"}, function(data) {
    videoImg = data[0].thumbnail_large;
  });

  $(".vimeo_"+id).attr("src", videoImg);

  return videoImg;

}
export function getImageAtt(val,dimension,cls){
  if(val) {
    var extension = val.split('.').pop().toLowerCase();
    var all = ['mp4', 'mov', 'mkv', 'txt', 'rtf', 'log', 'vsd', 'vsdx', 'vsdm', 'xml'];
    var image = '/packages/carii_theme/public/images/attacment/default_file.jpg';
    var img = ['jpeg', 'jpg', 'gif', 'bmp', 'png', 'webp'];


    var doc = ['doc', 'docx', 'wps'];
    var xls = ['xls', 'xlsx', 'csv'];
    var ppt = ['ppt', 'pptx'];
    var pdf = ['pdf'];

    if (val.search("blob") != -1) {
      image = val;
    }
    if (img.includes(extension)) {
      image = val;
    }

    if (doc.includes(extension)) {
      image = 'https://www.connective.network/packages/carii_theme/public/images/attacment/docx.png';
    }
    if (xls.includes(extension)) {
      image = 'https://www.connective.network/packages/carii_theme/public/images/attacment/xlsx.png';
    }
    if (ppt.includes(extension)) {
      image = 'https://www.connective.network/packages/carii_theme/public/images/attacment/pptx.png';
    }
    if (pdf.includes(extension)) {
      image = 'https://www.connective.network/packages/carii_theme/public/images/attacment/pdf.png';
    }

    /*if(dimension){
     image = getThumbnailUrl(image,dimension);
     }*/
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = val ? val.toString().match(regExp) : '';

    var regExp2 = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i;

    var match2 = val ? val.toString().match(regExp2) : '';

    if (match && match[2].length == 11) {
      var youtube_video_id = getYoutubeId(val); //val.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();

      if (youtube_video_id && youtube_video_id.length == 11) {
        var video_thumbnail = '//img.youtube.com/vi/'+youtube_video_id+'/0.jpg';
        return video_thumbnail;

      }
    }else if (match2 && match2[1]){

      var contetData = val.split('/');

      var vimeoVideoID = contetData[4];

      var videoImg = 'https://www.connective.network/packages/carii_theme/public/images/default_video.jpg';

      videoImg =  callVimeoImage(vimeoVideoID,cls);



      return videoImg
    }


    //return image;
  }
}


export function callImage(file) {


  if(file){

    if(file.attachmentType && file.attachmentType.attachmentTypeCode ==1){

      return file.url;
    }else if(file.attachmentType && file.attachmentType.attachmentTypeCode ==2){

      return "https://www.connective.network/packages/carii_theme/public/images/new_icon_version_v3_1/icon-files/file-" + isTypeFile(file.name)+".jpg"

    }else if(isVimeo(file.url)){
      return getImageAtt(file.url,'',file._id);
    }else if(isYoutube(file.url)){
      return getImageAtt(file.url,'',file._id);
    }else if(isVideo(file.url)){
      return file.thumbnail
    }
  }else{
    return "https://via.placeholder.com/256x256/333333/666666/?text=LOGO"
  }

}

export function getVideo(url){
  let regExp2 = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i;
  let match2 = url ? url.toString().match(regExp2) : '';
  if (match2){
    url = 'https://player.vimeo.com/video/'+match2[1]+'?autoplay=0&loop=1&autopause=1';
  }else{
    let matchyoutube = url.toString().match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)

    if(matchyoutube){
      let youtube_video_id = matchyoutube.pop();
      if (youtube_video_id && youtube_video_id.length == 11) {
        url = 'https://www.youtube.com/embed/' + youtube_video_id + '';
      }
    }else{
      url = url;
    }
  }

  return url;

}





export const MediaShow = (props) => {

  let url = props.url
    if(url) {
        if (isYoutube(url) || isVimeo(url) || isVideo(url)) {
            return (<iframe
                allowFullScreen={1}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="YouTube video player"
                src={getVideo(url)}
                width="100%"
                height="100%"
                frameBorder={0}
            ></iframe>)
        } else {
            return (<img
                src={url}
            />)
        }
    }
};


export const MediaShowExpBuilder = (props) => {

    let url = props.url
    if(url) {
        if (isYoutube(url) || isVimeo(url) || isVideo(url)) {
            return (<iframe
                allowFullScreen={1}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="YouTube video player"
                src={getVideo(url)}
                width="100%"
                height="100%"
                frameBorder={0}
            ></iframe>)
        } else {
            return (<img
                style={{width:'100%'}}
                src={url}
            ></img>)
        }
    }
};

