// ===================== Tracking System ======================
/**
 * @param {*} response
 * @returns
 */
function DHL(param) {
  /*
  console.log({ trackNo: param.trackingNumber });
  const trackingNumber = "00340434292135100179";
  const API = `https://api-eu.dhl.com/track/shipments?trackingNumber=4131224716&language=en&offset=0&limit=5`;
  */
  const getResponse = {};
  const url = `https://api-eu.dhl.com/track/shipments?trackingNumber=${param.trackingNumber}&language=en&offset=0&limit=5`;
  const options = {
    method: "GET",
    headers: {
      "DHL-API-Key": "u5IyCsM3Yl65JYQQjGQN9fbvWKFgMCGl",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data) {
        document.getElementById("trackingStatus").classList.remove("d-none");
        printData(data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

// Call this function in form handling > DHL({ trackingNumber: "4131224716" });

// ===================== Print Tracking Status into HTML Page ======================
/**
 * @param {*} params
 */
function printData(response) {
  const demoResponse2 = response || {
    shipments: [
      {
        id: "4131224716",
        service: "express",
        origin: {
          address: {
            addressLocality: "DHAKA - BANGLADESH",
          },
          servicePoint: {
            url: "http://www.dhl.com.bd/en/country_profile.html",
            label: "Origin Service Area",
          },
        },
        destination: {
          address: {
            addressLocality: "MANILA - PHILIPPINES, THE",
          },
          servicePoint: {
            url: "http://www.dhl.com.ph/en/country_profile.html",
            label: "Destination Service Area",
          },
        },
        status: {
          timestamp: "2022-04-14T10:08:00",
          location: {
            address: {
              addressLocality: "MANILA - PHILIPPINES, THE",
            },
          },
          description:
            "Customs clearance status updated. Note; The Customs clearance process may start while the shipment is in transit to the destination.",
          remark: "The shipment is pending completion of customs inspection.",
          nextSteps:
            "The status will be updated following customs inspection. A DHL representative will attempt to contact the importer if additional requirements are necessary.",
        },
        details: {
          proofOfDelivery: {
            signatureUrl:
              "https://proview.dhl.com/proview/adhocnotify?id=3RBY0IxBORIQdtuH5%2FAUh5h%2FkrRB7XethXdun71Ou1A%3D&appuid=ygGuYuwRHGDIi%2FfxJjVSrg%3D%3D&locale=en_G0&token=Y6XFpv6CR91wuTBhu13JMLA0V4qA124LF2O22zX5298%3D",
            documentUrl:
              "https://proview.dhl.com/proview/adhocnotify?id=3RBY0IxBORIQdtuH5%2FAUh5h%2FkrRB7XethXdun71Ou1A%3D&appuid=ygGuYuwRHGDIi%2FfxJjVSrg%3D%3D&locale=en_G0&token=Y6XFpv6CR91wuTBhu13JMLA0V4qA124LF2O22zX5298%3D",
          },
          proofOfDeliverySignedAvailable: false,
          totalNumberOfPieces: 2,
          pieceIds: ["JD014600009635575176", "JD014600009635575177"],
        },
        events: [
          {
            timestamp: "2022-04-14T10:08:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description:
              "Customs clearance status updated. Note; The Customs clearance process may start while the shipment is in transit to the destination.",
          },
          {
            timestamp: "2022-04-13T01:40:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description: "Clearance event",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
          {
            timestamp: "2022-04-12T12:41:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description:
              "Customs clearance status updated. Note; The Customs clearance process may start while the shipment is in transit to the destination.",
          },
          {
            timestamp: "2022-04-11T20:39:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description:
              "Customs clearance status updated. Note; The Customs clearance process may start while the shipment is in transit to the destination.",
          },
          {
            timestamp: "2022-04-10T00:27:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description: "Clearance event",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
          {
            timestamp: "2022-04-09T07:53:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description: "Processed for clearance at MANILA - PHILIPPINES, THE",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
          {
            timestamp: "2022-04-09T07:42:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description: "Clearance event",
            pieceIds: ["JD014600009635575176"],
          },
          {
            timestamp: "2022-04-09T06:45:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description:
              "Arrived at DHL Sort Facility MANILA - PHILIPPINES, THE",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
          {
            timestamp: "2022-04-08T16:03:00",
            location: {
              address: {
                addressLocality: "HONG KONG - HONG KONG SAR, CHINA",
              },
            },
            description:
              "Shipment has departed from a DHL facility HONG KONG - HONG KONG SAR, CHINA",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
          {
            timestamp: "2022-04-08T15:15:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description:
              "Customs clearance status updated. Note; The Customs clearance process may start while the shipment is in transit to the destination.",
          },
          {
            timestamp: "2022-04-08T03:43:00",
            location: {
              address: {
                addressLocality: "HONG KONG - HONG KONG SAR, CHINA",
              },
            },
            description: "Shipment is on hold",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
          {
            timestamp: "2022-04-07T21:22:00",
            location: {
              address: {
                addressLocality: "HONG KONG - HONG KONG SAR, CHINA",
              },
            },
            description: "Processed at HONG KONG - HONG KONG SAR, CHINA",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
          {
            timestamp: "2022-04-07T21:22:00",
            location: {
              address: {
                addressLocality: "HONG KONG - HONG KONG SAR, CHINA",
              },
            },
            description:
              "Clearance processing complete at HONG KONG - HONG KONG SAR, CHINA",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
          {
            timestamp: "2022-04-07T16:26:00",
            location: {
              address: {
                addressLocality: "HONG KONG - HONG KONG SAR, CHINA",
              },
            },
            description:
              "Customs clearance status updated. Note; The Customs clearance process may start while the shipment is in transit to the destination.",
          },
          {
            timestamp: "2022-04-07T03:07:00",
            location: {
              address: {
                addressLocality: "DHAKA - BANGLADESH",
              },
            },
            description:
              "Shipment has departed from a DHL facility DHAKA - BANGLADESH",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
          {
            timestamp: "2022-04-06T23:04:00",
            location: {
              address: {
                addressLocality: "DHAKA - BANGLADESH",
              },
            },
            description: "Processed at DHAKA - BANGLADESH",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
          {
            timestamp: "2022-04-06T21:54:00",
            location: {
              address: {
                addressLocality: "DHAKA - BANGLADESH",
              },
            },
            description:
              "Shipper has generated a shipment label, but the shipment has not yet been handed over to DHL",
          },
          {
            timestamp: "2022-04-06T21:54:00",
            location: {
              address: {
                addressLocality: "DHAKA - BANGLADESH",
              },
            },
            description: "Shipment Accepted",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
        ],
      },
    ],
    possibleAdditionalShipmentsUrl: [
      "/track/shipments?trackingNumber=4131224716&language=en&service=freight",
      "/track/shipments?trackingNumber=4131224716&language=en&service=dgf",
      "/track/shipments?trackingNumber=4131224716&language=en&service=ecommerce",
      "/track/shipments?trackingNumber=4131224716&language=en&service=parcel-de",
      "/track/shipments?trackingNumber=4131224716&language=en&service=parcel-nl",
      "/track/shipments?trackingNumber=4131224716&language=en&service=parcel-pl",
      "/track/shipments?trackingNumber=4131224716&language=en&service=post-de",
      "/track/shipments?trackingNumber=4131224716&language=en&service=sameday",
      "/track/shipments?trackingNumber=4131224716&language=en&service=parcel-uk",
      "/track/shipments?trackingNumber=4131224716&language=en&service=ecommerce-apac",
      "/track/shipments?trackingNumber=4131224716&language=en&service=ecommerce-europe",
    ],
  };

  /**
   * Distructure Array first index from shipment.
   * const shipment = demoResponse2.shipments[0]
   */
  const [shipments] = demoResponse2.shipments;

  /**Tracking Code */
  send("trackingCode", "Tracking Code: ", shipments.id);

  /** Shipment Status Message */
  send("trackingStatusMessage", "", shipments.status.description);
  send(
    "trackingResultOrigin",
    "Service area: ",
    shipments.origin.address.addressLocality
  );
  send(
    "trackingResultDestination",
    "Service area: ",
    shipments.destination.address.addressLocality
  );

  const { timestamp, location } = shipments.status;
  const getDetails = ", Service area: " + location.address.addressLocality;
  send("trackingResultStatus", "", formatDate(timestamp), getDetails);

  send("pieces", "", shipments.details.totalNumberOfPieces, " Piece ID's");

  /**
   * Next Step and Remark in JS
   * Futhur Details and Next Step in HTML
   */
  if (shipments.status.remark) {
    send("remark", "Further Detail<br>", shipments.status.remark);
  }
  if (shipments.status.nextSteps) {
    send("nextSteps", "Next Step<br>", shipments.status.nextSteps);
  }

  /** More Shipment Details */
  const { pieceIds } = shipments.details;
  send("trackingPieceIdContent1", pieceIds[0], "<br>", pieceIds[1]);

  /** Print container for every events Array element. */
  const { events } = shipments;
  events.forEach((element) => {
    CreateContainer(element);
  });
}
// Only for test called here
// printData();

/**
 *
 * @param {*} target
 * @param {*} preText
 * @param {*} data
 * @param {*} afterText
 */
function send(target = "", preText = "", data, afterText = "") {
  document.getElementById(target).innerHTML = preText + data + afterText;
}

/**
 *
 * @param {*} date
 * @returns
 */
function formatDate(date) {
  const ct = new Date(date);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let exp = ct.getDate() + " " + month[ct.getMonth()] + ", " + ct.getFullYear();
  return exp;
}

const example = {
  timestamp: "2022-04-14T10:08:00",
  location: {
    address: {
      addressLocality: "MANILA - PHILIPPINES, THE",
    },
  },
  description:
    "Customs clearance status updated. Note; The Customs clearance process may start while the shipment is in transit to the destination.",
};

/**
 *
 * @param {*} param
 */
function CreateContainer(param = {}) {
  const container = CreateTag("DIV", "", "shipment-container px-3 px-lg-4");
  container.appendChild(CreateRow(param));

  /**Send into HTML document */
  document.getElementById("allShipmentUpdatesContent").appendChild(container);
}

/**
 *
 * @param {*} param
 * @returns
 */
function CreateRow(param = {}) {
  // const pieceId = params.pieceIds ? params.pieceIds : "";
  const col3 = CreateCol(param.timestamp);
  const col9 = CreateCol(param);
  const row = CreateTag("DIV", "", "row border-bottom py-4");

  row.appendChild(col3);
  row.appendChild(col9);

  return row;
}

/**
 *
 * @param {*} param
 * @returns
 */
function CreateCol(param) {
  if (typeof param === "string") {
    // Create col-3
    let dayDateTime = formater(param);

    const weekday = CreateTag("DIV", dayDateTime[0]);
    const dateTime = CreateTag("DIV", dayDateTime[1], "h5");
    const localTime = CreateTag("DIV", dayDateTime[2]);

    const col3 = CreateTag("DIV", "", "col-sm-3 p-0");
    col3.appendChild(weekday);
    col3.appendChild(dateTime);
    col3.appendChild(localTime);

    return col3;
  } else {
    // Create col-9
    const col9 = CreateTag("DIV", "", "col-sm-9 p-0");

    const desc = CreateTag("DIV", param.description, "h5 text-justify");
    const address = CreateTag("DIV", param.location.address.addressLocality);

    col9.appendChild(desc);
    col9.appendChild(address);

    if (param.pieceIds) {
      const pidStr =
        "Piece ID's: " + param.pieceIds[0] + " & " + param.pieceIds[1];
      const pid = CreateTag("DIV", pidStr);
      col9.appendChild(pid);
    }

    return col9;
  }
}
/**
 * Called here only for test
 * It will called from shipment events array
 */
// CreateContainer(example);

/**
 *
 * @param {*} date
 * @returns
 */
function formater(date) {
  const ct = new Date(date);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const week = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurstday",
    "Friday",
  ];
  const weekdaycount = ct.getDay();
  const wday = week[weekdaycount];
  const localtime = ct.getHours() + ":" + ct.getMinutes() + " Local time";
  const exp =
    ct.getDate() + " " + month[ct.getMonth()] + ", " + ct.getFullYear();

  return [wday, exp, localtime];
}

/**
 *
 * @param {*} tagName
 * @param {*} text
 * @param {*} classes
 * @param {*} identity
 * @returns
 */
function CreateTag(tagName = "", text = "", classes = "", identity = "") {
  if (tagName) {
    const element = document.createElement(tagName);
    if (text) {
      element.innerHTML = text;
    }
    if (classes) {
      element.className = classes;
    }
    if (identity) {
      element.id = identity;
    }
    return element;
  } else {
    return "No tag name given.";
  }
}
