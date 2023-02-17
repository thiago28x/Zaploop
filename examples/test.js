//start function 1

function filterLinks(links) {
    const linkKeys = Object.keys(links);
    return Object.keys(links)
      .filter(key => links[key]["resource-type"] === "funding-source")
      .map(key => ({
        "Resource-type": links[key]["resource-type"],
        "href link": links[key]["href"],
        "ID": links[key]["href"].split("/").pop(),
        "title": linkKeys.find(linkKey => links[linkKey] === links[key]) || "unknown"
      }));
  }
  
  
  const data = '{"_links":{"self":{"href":"https://api-sandbox.dwolla.com/transfers/407c6da0-80ac-ed11-814c-8b3cb3208c85","type":"application/vnd.dwolla.v1.hal+json","resource-type":"transfer"},"source":{"href":"https://api-sandbox.dwolla.com/customers/95cd2b2b-6666-44e2-87d7-00fb83c2bb53","type":"application/vnd.dwolla.v1.hal+json","resource-type":"customer"},"destination":{"href":"https://api-sandbox.dwolla.com/funding-sources/51e8b4f3-f90e-48b7-bb98-f45ece0b1304","type":"application/vnd.dwolla.v1.hal+json","resource-type":"funding-source"},"destination-funding-source":{"href":"https://api-sandbox.dwolla.com/funding-sources/51e8b4f3-f90e-48b7-bb98-f45ece0b1304","type":"application/vnd.dwolla.v1.hal+json","resource-type":"funding-source"}},"id":"407c6da0-80ac-ed11-814c-8b3cb3208c85","status":"processed","amount":{"value":"1.00","currency":"USD"},"created":"2023-02-14T16:00:06.773Z","clearing":{"destination":"next-day"},"individualAchId":"IWKNV644","achDetails":{"source":{},"destination":{"addenda":{"values":["null"]}}}}';
  
  const parsedData = JSON.parse(data);
  const filteredLinks = filterLinks(parsedData._links);
  console.table(filteredLinks);


//end of function 1


//start function 2
const data3 = filteredLinks;

//maps
const filteredData = data2.map(({ title, ID }) => [title, ID]);



console.log(filteredData);
const outputString2 = JSON.stringify(filteredData);


//bubble_fn_filtered_array2(outputString2 )




const data2 = '{"_links":{"self":{"href":"https://api-sandbox.dwolla.com/transfers/407c6da0-80ac-ed11-814c-8b3cb3208c85","type":"application/vnd.dwolla.v1.hal+json","resource-type":"transfer"},"source":{"href":"https://api-sandbox.dwolla.com/customers/95cd2b2b-6666-44e2-87d7-00fb83c2bb53","type":"application/vnd.dwolla.v1.hal+json","resource-type":"customer"},"destination":{"href":"https://api-sandbox.dwolla.com/funding-sources/51e8b4f3-f90e-48b7-bb98-f45ece0b1304","type":"application/vnd.dwolla.v1.hal+json","resource-type":"funding-source"},"destination-funding-source":{"href":"https://api-sandbox.dwolla.com/funding-sources/51e8b4f3-f90e-48b7-bb98-f45ece0b1304","type":"application/vnd.dwolla.v1.hal+json","resource-type":"funding-source"}},"id":"407c6da0-80ac-ed11-814c-8b3cb3208c85","status":"processed","amount":{"value":"1.00","currency":"USD"},"created":"2023-02-14T16:00:06.773Z","clearing":{"destination":"next-day"},"individualAchId":"IWKNV644","achDetails":{"source":{},"destination":{"addenda":{"values":["null"]}}}}';



function filterAndMapLinks(data) {
  const parsedData = JSON.parse(data);
  const linkKeys = Object.keys(parsedData._links);
  const filteredLinks = linkKeys
    .filter(key => parsedData._links[key]["resource-type"] === "funding-source")
    .map(key => ({
      "Resource-type": parsedData._links[key]["resource-type"],
      "href link": parsedData._links[key]["href"],
      "ID": parsedData._links[key]["href"].split("/").pop(),
      "title": linkKeys.find(linkKey => parsedData._links[linkKey] === parsedData._links[key]) || "unknown"
    }));
  
  
  console.table(filteredLinks);
  const filteredData = filteredLinks.map(({ title, ID }) => [title, ID]);
  console.log(filteredData);
  const outputString = JSON.stringify(filteredData);
  return outputString;
}



