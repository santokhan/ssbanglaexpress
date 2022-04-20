const tForm = document.forms.namedItem("trackingForm");
tForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(tForm);

  const method = formData.get("courier");
  if (method === "DHL") {
    DHL({ trackingNumber: formData.get("tracking_number") });
  }

  /* Remember input element name="" to get value of input */
  // console.log({ tracking_number: formData.get("tracking_number") });
});

/** Tracking Result */
const pieceId = document.querySelector(".pieceId-button");
// console.log(pieceId);
pieceId.forEach((element) => {
  console.log(element);
});

/**
 * @param {*} target
 */
function ShowHide(target = "") {
  document.getElementById(target).classList.toggle("d-none");
}
