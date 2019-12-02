$(document).ready(() => {
  
  $('.custom-file-input').on('change',function(){
    var path = $(this).val();
    $(this).next('.custom-file-label').addClass("selected").html(`${path.split('C:\\fakepath\\')[1]}`); 
  });

  $('#processButton').click(e => {
    let file = $('.custom-file-input')[0].files[0];
    if(file.type !== 'text/xml') {
      alert('please chose an XML file only!');
    } else {
      file.text().then(x => download('file.xml', getFileData(x)));
    }

  });
});


let getFileData = xmlAsString => {
  let parsedXml = $.parseXML(xmlAsString);
  let $xml = $(parsedXml);  
  return $xml.find('note')[0].outerHTML;
}

const download =  (filename, text) => {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}