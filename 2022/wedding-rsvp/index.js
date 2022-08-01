document.querySelector(".front").addEventListener("click", function () {
  if (
    document
      .querySelector(".library-card.envelope")
      .classList.contains("card-in")
  ) {
    document
      .querySelector(".library-card.envelope")
      .classList.toggle("card-in");
  }
  document.querySelector(".library-card.envelope").classList.toggle("card-out");
});

document.querySelector(".submit").addEventListener("click", function () {
  document.querySelector(".library-card.envelope").classList.toggle("card-in");
  if (
    document
      .querySelector(".library-card.envelope")
      .classList.contains("card-out")
  ) {
    document
      .querySelector(".library-card.envelope")
      .classList.toggle("card-out");
  }
  document.querySelector(".stamp").html("Thanks for RSVP-ing!");
  setTimeout(function () {
    document.querySelector(".stamp").html("Click here to RSVP");
  }, 3000);
  setTimeout(function () {
    document.location.href = document.location.href;
  }, 1500);
});
