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
    const { Marker, SymbolPath, AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
    const map = await new Map(document.getElementById("map"), {
        zoom: 13, //9,
        center: { lat: 13.745608688156873, lng: 100.53412051262357 },
        mapId: "63a6c0e6f43355c6",
    });
    const infoWindow = new InfoWindow();

    fetch('asset.json')
        .then(response => response.json())
        .then(data => {
            data.asset.forEach(({ name, detail, position }, i) => {
                const marker = new AdvancedMarkerElement({
                    map,
                    content: buildContent(detail),
                    position: position,
                    title: name,
                    collisionBehavior: 'OPTIONAL_AND_HIDES_LOWER_PRIORITY'   
                });



                marker.addListener("click", () => {
                    if (marker.content.classList.contains("highlight")) {
                        marker.content.classList.remove("highlight");
                        return
                    }
                    document.querySelectorAll('.highlight').forEach((element) => {
                        element.classList.remove('highlight');
                        element.zIndex = null;
                    });
                    marker.content.classList.add("highlight");
                    marker.zIndex = 1;
                    // toggleHighlight(marker);
                    // infoWindow.close();
                    // infoWindow.setContent(marker.title);
                    // infoWindow.open(marker.map, marker);
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

function toggleHighlight(markerView) {
    if (markerView.content.classList.contains("highlight")) {
        markerView.content.classList.remove("highlight");
        return
    }
    document.querySelectorAll('.highlight').forEach((element) => {
        element.classList.remove('highlight');
        element.zIndex = null;
    });
    markerView.content.classList.add("highlight");
    markerView.zIndex = 1;
    // if (markerView.content.classList.contains("highlight")) {
    //     markerView.content.classList.remove("highlight");
    //     markerView.zIndex = null;
    // } else {
    //     markerView.content.classList.add("highlight");
    //     markerView.zIndex = 1;
    // }
}

function buildContent(property) {
    const content = document.createElement("div");

    content.classList.add("property");
    content.innerHTML = `
      <div class="icon">
          <i aria-hidden="true" class="fa fa-icon fa-${property.type}" title="${property.type}"></i>
          <span class="fa-sr-only">${property.type}</span>
      </div>
      <div class="details">
          <div class="price">${property.price}</div>
          <div class="address">${property.address}</div>
          <div class="features">
          <div>
              <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
              <span class="fa-sr-only">bedroom</span>
              <span>${property.bed}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom"></i>
              <span class="fa-sr-only">bathroom</span>
              <span>${property.bath}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
              <span class="fa-sr-only">size</span>
              <span>${property.size} ft<sup>2</sup></span>
          </div>
          </div>
      </div>
      `;
    return content;
}

window.initMap = initMap;