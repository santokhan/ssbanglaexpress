/**
 * Unnessesary
 */
/**
 * @param {*} countryISO
 * @returns
 * Return Country name from Country ISO
 */
function FindCountry(countryISO = "") {
  const ISOArr = [
    ["Afghanistan", "AF"],
    ["Albania", "AL"],
    ["Algeria", "DZ"],
    ["American Samoa", "AS"],
    ["Andorra", "AD"],
    ["Angola", "AO"],
    ["Anguilla", "AI"],
    ["Antarctica", "AQ"],
    ["Antigua and Barbuda", "AG"],
    ["Argentina", "AR"],
    ["Armenia", "AM"],
    ["Aruba", "AW"],
    ["Australia", "AU"],
    ["Austria", "AT"],
    ["Azerbaijan", "AZ"],
    ["Bahamas", "BS"],
    ["Bahrain", "BH"],
    ["Bangladesh", "BD"],
    ["Barbados", "BB"],
    ["Belarus", "BY"],
    ["Belgium", "BE"],
    ["Belize", "BZ"],
    ["Benin", "BJ"],
    ["Bermuda", "BM"],
    ["Bhutan", "BT"],
    ["Bolivia", "BO"],
    ["Bosnia and Herzegovina", "BA"],
    ["Botswana", "BW"],
    ["Brazil", "BR"],
    ["British Indian Ocean Territory", "IO"],
    ["British Virgin Islands", "VG"],
    ["Brunei", "BN"],
    ["Bulgaria", "BG"],
    ["Burkina Faso", "BF"],
    ["Burundi", "BI"],
    ["Cambodia", "KH"],
    ["Cameroon", "CM"],
    ["Canada", "CA"],
    ["Cape Verde", "CV"],
    ["Cayman Islands", "KY"],
    ["Central African Republic", "CF"],
    ["Chad", "TD"],
    ["Chile", "CL"],
    ["China", "CN"],
    ["Christmas Island", "CX"],
    ["Cocos Islands", "CC"],
    ["Colombia", "CO"],
    ["Comoros", "KM"],
    ["Cook Islands", "CK"],
    ["Costa Rica", "CR"],
    ["Croatia", "HR"],
    ["Cuba", "CU"],
    ["Curacao", "CW"],
    ["Cyprus", "CY"],
    ["Czech Republic", "CZ"],
    ["Democratic Republic of the Congo", "CD"],
    ["Denmark", "DK"],
    ["Djibouti", "DJ"],
    ["Dominica", "DM"],
    ["Dominican Republic", "DO"],
    ["East Timor", "TL"],
    ["Ecuador", "EC"],
    ["Egypt", "EG"],
    ["El Salvador", "SV"],
    ["Equatorial Guinea", "GQ"],
    ["Eritrea", "ER"],
    ["Estonia", "EE"],
    ["Ethiopia", "ET"],
    ["Falkland Islands", "FK"],
    ["Faroe Islands", "FO"],
    ["Fiji", "FJ"],
    ["Finland", "FI"],
    ["France", "FR"],
    ["French Polynesia", "PF"],
    ["Gabon", "GA"],
    ["Gambia", "GM"],
    ["Georgia", "GE"],
    ["Germany", "DE"],
    ["Ghana", "GH"],
    ["Gibraltar", "GI"],
    ["Greece", "GR"],
    ["Greenland", "GL"],
    ["Grenada", "GD"],
    ["Guam", "GU"],
    ["Guatemala", "GT"],
    ["Guernsey", "GG"],
    ["Guinea", "GN"],
    ["Guinea-Bissau", "GW"],
    ["Guyana", "GY"],
    ["Haiti", "HT"],
    ["Honduras", "HN"],
    ["Hong Kong", "HK"],
    ["Hungary", "HU"],
    ["Iceland", "IS"],
    ["India", "IN"],
    ["Indonesia", "ID"],
    ["Iran", "IR"],
    ["Iraq", "IQ"],
    ["Ireland", "IE"],
    ["Isle of Man", "IM"],
    ["Israel", "IL"],
    ["Italy", "IT"],
    ["Ivory Coast", "CI"],
    ["Jamaica", "JM"],
    ["Japan", "JP"],
    ["Jersey", "JE"],
    ["Jordan", "JO"],
    ["Kazakhstan", "KZ"],
    ["Kenya", "KE"],
    ["Kiribati", "KI"],
    ["Kosovo", "XK"],
    ["Kuwait", "KW"],
    ["Kyrgyzstan", "KG"],
    ["Laos", "LA"],
    ["Latvia", "LV"],
    ["Lebanon", "LB"],
    ["Lesotho", "LS"],
    ["Liberia", "LR"],
    ["Libya", "LY"],
    ["Liechtenstein", "LI"],
    ["Lithuania", "LT"],
    ["Luxembourg", "LU"],
    ["Macau", "MO"],
    ["Macedonia", "MK"],
    ["Madagascar", "MG"],
    ["Malawi", "MW"],
    ["Malaysia", "MY"],
    ["Maldives", "MV"],
    ["Mali", "ML"],
    ["Malta", "MT"],
    ["Marshall Islands", "MH"],
    ["Mauritania", "MR"],
    ["Mauritius", "MU"],
    ["Mayotte", "YT"],
    ["Mexico", "MX"],
    ["Micronesia", "FM"],
    ["Moldova", "MD"],
    ["Monaco", "MC"],
    ["Mongolia", "MN"],
    ["Montenegro", "ME"],
    ["Montserrat", "MS"],
    ["Morocco", "MA"],
    ["Mozambique", "MZ"],
    ["Myanmar", "MM"],
    ["Namibia", "NA"],
    ["Nauru", "NR"],
    ["Nepal", "NP"],
    ["Netherlands", "NL"],
    ["Netherlands Antilles", "AN"],
    ["New Caledonia", "NC"],
    ["New Zealand", "NZ"],
    ["Nicaragua", "NI"],
    ["Niger", "NE"],
    ["Nigeria", "NG"],
    ["Niue", "NU"],
    ["North Korea", "KP"],
    ["Northern Mariana Islands", "MP"],
    ["Norway", "NO"],
    ["Oman", "OM"],
    ["Pakistan", "PK"],
    ["Palau", "PW"],
    ["Palestine", "PS"],
    ["Panama", "PA"],
    ["Papua New Guinea", "PG"],
    ["Paraguay", "PY"],
    ["Peru", "PE"],
    ["Philippines", "PH"],
    ["Pitcairn", "PN"],
    ["Poland", "PL"],
    ["Portugal", "PT"],
    ["Puerto Rico", "PR"],
    ["Qatar", "QA"],
    ["Republic of the Congo", "CG"],
    ["Reunion", "RE"],
    ["Romania", "RO"],
    ["Russia", "RU"],
    ["Rwanda", "RW"],
    ["Saint Barthelemy", "BL"],
    ["Saint Helena", "SH"],
    ["Saint Kitts and Nevis", "KN"],
    ["Saint Lucia", "LC"],
    ["Saint Martin", "MF"],
    ["Saint Pierre and Miquelon", "PM"],
    ["Saint Vincent and the Grenadines", "VC"],
    ["Samoa", "WS"],
    ["San Marino", "SM"],
    ["Sao Tome and Principe", "ST"],
    ["Saudi Arabia", "SA"],
    ["Senegal", "SN"],
    ["Serbia", "RS"],
    ["Seychelles", "SC"],
    ["Sierra Leone", "SL"],
    ["Singapore", "SG"],
    ["Sint Maarten", "SX"],
    ["Slovakia", "SK"],
    ["Slovenia", "SI"],
    ["Solomon Islands", "SB"],
    ["Somalia", "SO"],
    ["South Africa", "ZA"],
    ["South Korea", "KR"],
    ["South Sudan", "SS"],
    ["Spain", "ES"],
    ["Sri Lanka", "LK"],
    ["Sudan", "SD"],
    ["Suriname", "SR"],
    ["Svalbard and Jan Mayen", "SJ"],
    ["Swaziland", "SZ"],
    ["Sweden", "SE"],
    ["Switzerland", "CH"],
    ["Syria", "SY"],
    ["Taiwan", "TW"],
    ["Tajikistan", "TJ"],
    ["Tanzania", "TZ"],
    ["Thailand", "TH"],
    ["Togo", "TG"],
    ["Tokelau", "TK"],
    ["Tonga", "TO"],
    ["Trinidad and Tobago", "TT"],
    ["Tunisia", "TN"],
    ["Turkey", "TR"],
    ["Turkmenistan", "TM"],
    ["Turks and Caicos Islands", "TC"],
    ["Tuvalu", "TV"],
    ["U.S. Virgin Islands", "VI"],
    ["Uganda", "UG"],
    ["Ukraine", "UA"],
    ["United Arab Emirates", "AE"],
    ["United Kingdom", "GB"],
    ["United States", "US"],
    ["Uruguay", "UY"],
    ["Uzbekistan", "UZ"],
    ["Vanuatu", "VU"],
    ["Vatican", "VA"],
    ["Venezuela", "VE"],
    ["Vietnam", "VN"],
    ["Wallis and Futuna", "WF"],
    ["Western Sahara", "EH"],
    ["Yemen", "YE"],
    ["Zambia", "ZM"],
    ["Zimbabwe", "ZW"],
  ];
  let c;
  ISOArr.forEach((ele) => {
    if (ele[1] === countryISO) {
      c = ele[0];
    }
  });
  return c;
}
// console.log(FindCountry("DE"));

const demo = {
  shipments: [
    {
      serviceUrl:
        "https://www.dhl.de/de/privatkunden.html?piececode=00340434292135100179&cid=c_dhl_de_352_20205002_151_M040",
      rerouteUrl:
        "https://www.dhl.de/de/privatkunden.html?piececode=00340434292135100179&verfuegen_selected_tab=FIRST&cid=c_dhl_de_352_20205001_150_M040",
      id: "00340434292135100179",
      service: "parcel-de",
      origin: {
        address: {
          countryCode: "DE",
        },
      },
      destination: {
        address: {
          countryCode: "DE",
        },
      },
      status: {
        timestamp: "2022-04-05T19:01:00",
        statusCode: "pre-transit",
        status:
          "The instruction data for this shipment have been provided by the sender to DHL electronically",
        description:
          "The instruction data for this shipment have been provided by the sender to DHL electronically",
      },
      details: {
        product: {
          productName: "DHL PAKET (parcel)",
        },
        proofOfDeliverySignedAvailable: false,
        totalNumberOfPieces: 1,
        pieceIds: ["340434292135100179"],
        weight: {
          value: 2,
          unitText: "kg",
        },
        dimensions: {
          width: {
            value: 0.3,
            unitText: "m",
          },
          height: {
            value: 0.14,
            unitText: "m",
          },
          length: {
            value: 0.38,
            unitText: "m",
          },
        },
      },
      events: [
        {
          timestamp: "2022-04-05T19:01:00",
          statusCode: "pre-transit",
          status:
            "The instruction data for this shipment have been provided by the sender to DHL electronically",
          description:
            "The instruction data for this shipment have been provided by the sender to DHL electronically",
        },
      ],
    },
  ],
  possibleAdditionalShipmentsUrl: [
    "/track/shipments?trackingNumber=00340434292135100179&language=en&service=freight",
    "/track/shipments?trackingNumber=00340434292135100179&language=en&service=dgf",
    "/track/shipments?trackingNumber=00340434292135100179&language=en&service=ecommerce",
    "/track/shipments?trackingNumber=00340434292135100179&language=en&service=parcel-nl",
    "/track/shipments?trackingNumber=00340434292135100179&language=en&service=parcel-pl",
    "/track/shipments?trackingNumber=00340434292135100179&language=en&service=dsc",
    "/track/shipments?trackingNumber=00340434292135100179&language=en&service=post-de",
    "/track/shipments?trackingNumber=00340434292135100179&language=en&service=sameday",
    "/track/shipments?trackingNumber=00340434292135100179&language=en&service=parcel-uk",
    "/track/shipments?trackingNumber=00340434292135100179&language=en&service=ecommerce-apac",
    "/track/shipments?trackingNumber=00340434292135100179&language=en&service=ecommerce-europe",
  ],
};
const demo3 = [
  {
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
          timestamp: "2022-04-16T13:29:00",
          location: {
            address: {
              addressLocality: "MANILA - PHILIPPINES, THE",
            },
          },
          statusCode: "delivered",
          status: "delivered",
          description: "Delivered",
        },
        details: {
          proofOfDelivery: {
            timestamp: "2022-04-16T13:29:00",
            signatureUrl:
              "https://webpod.dhl.com/webPOD/DHLePODRequest?hwb=RoH8tC8nFH%2F2RFO%2FyxrX9g%3D%3D&pudate=0r2VvYamwC4%2Bw8ajbnP35Q%3D%3D&appuid=u%2BtpQZ9Bx10S1%2FSsZvhSfw%3D%3D&language=en&country=G0",
            documentUrl:
              "https://webpod.dhl.com/webPOD/DHLePODRequest?hwb=RoH8tC8nFH%2F2RFO%2FyxrX9g%3D%3D&pudate=0r2VvYamwC4%2Bw8ajbnP35Q%3D%3D&appuid=u%2BtpQZ9Bx10S1%2FSsZvhSfw%3D%3D&language=en&country=G0",
          },
          proofOfDeliverySignedAvailable: false,
          totalNumberOfPieces: 2,
          pieceIds: ["JD014600009635575176", "JD014600009635575177"],
        },
        events: [
          {
            timestamp: "2022-04-16T13:29:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description: "Delivered",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
          {
            timestamp: "2022-04-16T10:22:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description: "Shipment is out with courier for delivery",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
          {
            timestamp: "2022-04-16T07:59:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description:
              "Arrived at DHL Delivery Facility MANILA - PHILIPPINES, THE",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
          {
            timestamp: "2022-04-16T07:07:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description:
              "Payment is received and recorded for shipment related fees",
          },
          {
            timestamp: "2022-04-16T06:59:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description:
              "Shipment has departed from a DHL facility MANILA - PHILIPPINES, THE",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
          {
            timestamp: "2022-04-16T02:34:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description: "Processed at MANILA - PHILIPPINES, THE",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
          {
            timestamp: "2022-04-16T02:23:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description:
              "Clearance processing complete at MANILA - PHILIPPINES, THE",
            pieceIds: ["JD014600009635575176", "JD014600009635575177"],
          },
          {
            timestamp: "2022-04-16T02:10:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description:
              "Customs clearance status updated. Note - The Customs clearance process may start while the shipment is in transit to the destination.",
          },
          {
            timestamp: "2022-04-14T10:08:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description:
              "Customs clearance status updated. Note - The Customs clearance process may start while the shipment is in transit to the destination.",
          },
          {
            timestamp: "2022-04-13T01:40:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description: "Clearance Event",
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
              "Customs clearance status updated. Note - The Customs clearance process may start while the shipment is in transit to the destination.",
          },
          {
            timestamp: "2022-04-11T20:39:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description:
              "Customs clearance status updated. Note - The Customs clearance process may start while the shipment is in transit to the destination.",
          },
          {
            timestamp: "2022-04-10T00:27:00",
            location: {
              address: {
                addressLocality: "MANILA - PHILIPPINES, THE",
              },
            },
            description: "Clearance Event",
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
            description: "Clearance Event",
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
              "Customs clearance status updated. Note - The Customs clearance process may start while the shipment is in transit to the destination.",
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
              "Customs clearance status updated. Note - The Customs clearance process may start while the shipment is in transit to the destination.",
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
            description: "Shipment information received",
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
  },
];
