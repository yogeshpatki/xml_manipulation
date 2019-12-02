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
      file.text().then(x => download('file.xml', processFileData(x)));
    }

  });
});


let processFileData = (xmlAsString) => {
  const code = `HARD-CODE.${$('#errorCode').val()}`;
  let parsedXml = $.parseXML(xmlAsString);
  let text = '';
  let $xml = $(parsedXml);
  let allDs = $xml.find('DS').toArray();


  text = allDs.filter(ds => 
    ($(ds).find('ERF')[0] && $(ds).find('ERF').attr('LNKD') == code)
 || ($(ds).find('E')[0] && $(ds).find('E').attr('ID') == code)

  ).map(ds => ds.outerHTML).join('\n');
  return text;
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