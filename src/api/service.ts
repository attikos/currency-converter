export const get = (url: string, body?: any) => {
	return fetch(url, {
	  method: 'GET',
	  body: JSON.stringify(body),
	}).then(res => res.json());
  }

  export const post = (url: string, body?: any) => {
	return fetch(url, {
	  method: 'POST',
	  body: JSON.stringify(body),
	}).then(res => res.json());
  }

  export const getFromXml = (url: string, body?: any) => {
	return fetch(url, {
	  method: 'GET',
	  body: JSON.stringify(body),
	})
	  .then(res => res.text())
	  .then(data => {
		const parser = new DOMParser();
		const xml = parser.parseFromString(data, "application/xml");
		return xmlToJson(xml);
	  })
  }

  export const xmlToJson = (xml: Document|ChildNode): any => {

	// Create the return object
	var obj: any = {};

	// if (xml.nodeType == 1) { // element
	// 	// do attributes
	// 	if (xml.attributes.length > 0) {
	// 	obj["@attributes"] = {};
	// 		for (var j = 0; j < xml.attributes.length; j++) {
	// 			var attribute = xml.attributes.item(j);
	// 			obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
	// 		}
	// 	}
	// } else
	if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				if (nodeName === '#text') {
					obj = xmlToJson(item);
				}
				else {
					obj[nodeName] = xmlToJson(item);
				}
			}
			else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
