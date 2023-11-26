// const trains = [{ name: "Thon Buri", lat: 13.760578398259632, lng: 100.47886866173842 },
// { name: "Taling Chan", lat: 13.78936141448204, lng: 100.43935253489451 },
// { name: "Salaya", lat: 13.80257421705698, lng: 100.32434610572372 },
// { name: "Nakhon Pathom", lat: 13.824373247120851, lng: 100.05941852544166 },
// { name: "Nong Pla Duk", lat: 13.818253620421787, lng: 99.91222767450081 },
// { name: "Tha Rua Noi", lat: 13.956107336620194, lng: 99.75163327069536 },
// { name: "Kanchanaburi", lat: 14.03398914203632, lng: 99.5255009441804 },
// { name: "Saphan Kwae Yai", lat: 14.042208519792297, lng: 99.50438144072866 },
// { name: "Wang Yen", lat: 13.949098735670182, lng: 99.40358927069671 },
// { name: "Ban Kao", lat: 13.96820211857763, lng: 99.31703779939406 },
// { name: "Tha Kilen", lat: 14.040655047962353, lng: 99.25667827069724 },
// { name: "Thamkra Sae", lat: 14.106068024757212, lng: 99.16574091310571 },
// { name: "Wang Pho", lat: 14.120037626927001, lng: 99.13912805687556 },
// { name: "Ko Maha Mongkol", lat: 14.15567211281862, lng: 99.10596958963461 },
// { name: "Nam Tok", lat: 14.232597812217307, lng: 99.068253251384 }];

async function initMap() {

    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { Marker, AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
    const map = await new Map(document.getElementById("map"), {
        zoom: 9,
        center: { lat: 14.182526, lng: 99.629110 },
        mapId: "63a6c0e6f43355c6",
    });
    const infoWindow = new InfoWindow();

    fetch('train.json')
        .then(response => response.json())
        .then(data => {
            data.train.forEach(({ name, lat, lng }, i) => {
                const icon = document.createElement("div");
                icon.innerHTML = '<i class="fa-solid fa-train-subway fa-xl"></i>';
                const pin = new PinElement({
                    glyph: icon,
                    glyphColor: "#000",
                    background: "#FFF",
                    borderColor: "#000",
                    scale: 1
                });
                // const marker = new Marker({
                //     position: { lat: lat, lng: lng },
                //     map: map,
                //     title: 'Custom Icon Marker',
                //     icon: {
                //         scaledSize: new google.maps.Size(50, 50), // Adjust the size as needed
                //         origin: new google.maps.Point(0, 0),
                //         anchor: new google.maps.Point(25, 25)
                        
                // }});
                const marker = new AdvancedMarkerElement({
                    position: { lat: lat, lng: lng },
                    map,
                    title: name,
                    content: pin.element,
                    // icon: {
                    //     url: "https://i.stack.imgur.com/PYAIJ.png",
                    //     size: new google.maps.Size(36, 36),
                    //     origin: new google.maps.Point(0, 0),
                    //     anchor: new google.maps.Point(18, 18),
                    //     scaledSize: new google.maps.Size(25, 25)
                    //     }
                });
                marker.addListener("click", () => {
                    infoWindow.close();
                    infoWindow.setContent(marker.title);
                    infoWindow.open(marker.map, marker);
                });
            });
        })
        .catch(error => console.error('Error loading station data:', error));

    // map.addListener("zoom_changed", () => {
    //     const zoom = map.getZoom();
        
    //     if (zoom) {
    //         // Only show each marker above a certain zoom level.
    //         marker01.map = zoom > 14 ? map : null;
    //         marker02.map = zoom > 15 ? map : null;
    //         marker03.map = zoom > 16 ? map : null;
    //         marker04.map = zoom > 17 ? map : null;
    //     }
    //     });
   
}

window.initMap = initMap;