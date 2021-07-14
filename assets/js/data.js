
// (c) 2021 KMDDR

window.onload = () => {
  console.log("data.js initialized");

  var releases = [
    // {artist id, release name, category, release date, album link}
    // Release ID is gathered by what entry it is in the array
    // Example: The entry under me's rel ID is 0

    // Category is the type of release.
    // 0: Single, 1: EP, 2: Album, 3: Compilation

    // Release date is stored in Unix
    // The link is stored as the end of the album link on BC
    // Example: "xxna" will be translated to
    // https://kmddr.bandcamp.com/album/xxna/
    { id: 0, name: "XxnA",          cat: 2, date: 1620864000, link: "xxna"          },
    { id: 1, name: "Personal Note", cat: 1, date: 1625184000, link: "personal-note" },
    // This timestamp is in the future. The database will detect that
    // and not display it on the website until July 16 comes up.
    // (This is in the website viewer's timezone)

    // Also, the database will realize there is no link and not make an href
    { id: 2, name: "Love is Dead",  cat: 1, date: 1626393600 },
  ];

  var artists = [
    // For sake of saving space, links are not stored as
    // "kmddr.bandcamp.com", but instead only the BC ID
    // is stored. The database will convert this to the
    // full BC link.
    { name: "K.M.D.D.R.",         bc: "kmddr"           },
    { name: "Vertical Slopes",    bc: "verticalslopes"  },
    { name: "Clyde is a Monster", bc: "clydeisamonster" },
    // This is a band that will be on the label in the future.
    // They do not have a BC link yet, so it will be set to -1
    // The database will correct this to just no link
    { name: "Noalaska Monument",  bc: -1  },
  ];

  // DATABASE CODE
  // This will import both of the arrays above
  // And convert them to code usable by the HTML
  var r = releases;
  var a = artists;
  // RELEASES SECTION
  var el = [];

  for ( let h = 0; h < 4; h++ ) {
    el[h] = document.createElement("ARTICLE");
  }

  for ( let i = 0; i < r.length; i++ ) {
    // Reset
    var innerArticle = [];
    // Create first <a>
      // Create the element, then add class + href
      innerArticle[0] = document.createElement("A");
      innerArticle[0].classList.add("thumbnail");
      innerArticle[0].href = "images/covers/" + i + ".jpg";
      innerArticle[0].setAttribute("data-position", "left center");
      innerArticle[0].setAttribute("alt", "\"\"");
      // Append image
      var img = document.createElement("IMG");
      img.src = "images/covers/" + i + ".jpg";
      img.alt = "";
      innerArticle[0].appendChild(img);
      // Programmer's Note: Why is the /thumbs/ folder seperate? What's the difference
      // between normal images and /thumbs/? - kmddr 7/13
    // Create second <a>
      // Create the element, add class + href
      innerArticle[1] = document.createElement("A");
      innerArticle[1].classList.add("artistlink");
      if(r[i].link !== undefined) { 
        var link = "https://" + a[r[i].id].bc + ".bandcamp.com/album/" + r[i].link;
        innerArticle[1].href = link;
      };
      innerArticle[1].setAttribute('target', '_blank');
      // Append H2
      var h2 = document.createElement("H2");
      innerArticle[1].classList.add("artistlink");
      h2.innerHTML = r[i].name;
      innerArticle[1].appendChild(h2);
    // Create third and final <a>
      // Create the element, add class + href
      innerArticle[2] = document.createElement("A");
      innerArticle[2].classList.add("artistlink");
      if ( a[r[i].id].bc !== -1 ) { innerArticle[2].href = "https://" + a[r[i].id].bc + ".bandcamp.com" };
      innerArticle[2].setAttribute('target', '_blank');
      // Append P
      var p = document.createElement("P");
      p.class = "artistlink";
      // Set the release name from the type
      switch(r[i].cat) {
        case 0: y = "Single";       break;
        case 1: y = "EP";           break;
        case 2: y = "Studio Album"; break;
        case 3: y = "Compilation";  break;
      }
      p.innerHTML = y + " by " + a[r[i].id].name;
      innerArticle[2].appendChild(p);
    // Append <a> to the <article>
    for ( let j = 0; j < innerArticle.length; j++ ) {
      el[i].appendChild(innerArticle[j]); // Line 102
    }
  }
  // console.log(r, a, innerArticle, el, document.getElementById("thumbnails"));
  // Add our article(s) to the thumbnails section
  // document.getElementById("thumbnails").appendChild(el);
  for ( let k = 0; k < innerArticle.length; k++ ) {
    document.getElementById("thumbnails").appendChild(el[k]);
  }
  // ARTISTS SECTION
  // This section is a lot simpler
  var innerSection = [];
  for ( let l = 0; l < a.length; l++ ) {
    innerSection[l] = document.createElement("A");
    if ( a[l].bc !== -1 ) { innerSection[l].href = "https://" + a[l].bc + ".bandcamp.com" };
    innerSection[l].innerHTML = a[l].name;
    // Append to section
    var sec = document.getElementById("inner");
    sec.appendChild(innerSection[l]);
    sec.appendChild(document.createElement("BR"));
  }
  console.log("data.js done")
};