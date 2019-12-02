$(document).ready(() => {
  
  $('#file_uploader').change(e => {
    let file = e.target.files[0];
    file.text().then(x => getFileData(x));
  });

  
  $('.custom-file-input').on('change',function(){
    var path = $(this).val();
    $(this).next('.custom-file-label').addClass("selected").html(`${path.split('C:\\fakepath\\')[1]}`); 
    let file = $('.custom-file-input')[0].files[0];
    file.text().then(text => {
      $('#xml_display').text(getFileData(text));
      hljs.highlightBlock($('#xml_display')[0]);
    });
    
    

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
  $xml.find('to').attr('security', 'S1');
  let $from = $xml.find('from');
  $from.append(`<description>${$xml.find('heading').html()}</description>`);
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