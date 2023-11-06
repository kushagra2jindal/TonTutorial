const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://tonapi.io/v2/sse/mempool?token=AFPJTKEBKGDV5CAAAAAJLNTYFGLRQUG45CR63D3ZM2PL2E3IFCGGVM2TV7GPX5ATBBMINOY',
  headers: { 
    'authority': 'tonapi.io', 
    'accept': 'text/event-stream', 
    'accept-language': 'en-GB,en;q=0.7', 
    'cache-control': 'no-cache', 
    'origin': 'https://tonviewer.com', 
    'referer': 'https://tonviewer.com/', 
    'sec-ch-ua': '"Chromium";v="118", "Brave";v="118", "Not=A?Brand";v="99"', 
    'sec-ch-ua-mobile': '?0', 
    'sec-ch-ua-platform': '"macOS"', 
    'sec-fetch-dest': 'empty', 
    'sec-fetch-mode': 'cors', 
    'sec-fetch-site': 'cross-site', 
    'sec-gpc': '1', 
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});