document.addEventListener('DOMContentLoaded', () => {
  saekjaVideo();
});

/* Fallið sem sækir gögn í .json skrá með ajax og kallar svo á
*  fall sem sér um að birta gögn */
function saekjaVideo() {
  var request = new XMLHttpRequest();

  request.open('GET', 'videos.json', true);
  request.onload = function () {
    if (request.status == 200) {
      var data = JSON.parse(request.response);
      show(data);
    }
    else {
      console.log('error');
    }
  }
  request.onerror = function() {
    console.error('Óþekkt villa');
  };

  request.send();
}

/* Fall sem sér um að birta gögnin sem búið er að sækja*/
function show(gogn) {
  // Byrjar á að finna hvað á að birta marga flokka af videoum
  for (var i=0; i<gogn.categories.length; i++) {
    const div = document.querySelector('.yfirlit'); // Eina div sem er harðkóðað í HTML
    const flokkur = document.createElement('div'); // Div fyrir hvern flokk
    const fyrirsogn = document.createElement('h2'); // Div fyrir fyrirsogn
    const video = document.createElement('div');
    const lina = document.createElement('hr');

    // Bæta klösum fyrir CSS vinnu
    flokkur.classList.add('flokkur');
    fyrirsogn.classList.add('fyrirsogn');
    video.classList.add('videoposter');

    // Byrti fyrirsögn á flokknum
    fyrirsogn.appendChild(document.createTextNode(gogn.categories[i].title));

    // Set boxin í hverjum flokk á réttan stað
    div.appendChild(flokkur);
    flokkur.appendChild(fyrirsogn);
    flokkur.appendChild(video);
    flokkur.appendChild(lina);
    // Fer í gegnum hvaða video á að birta í hverjum flokk
    for (var j=0; j<gogn.categories[i].videos.length; j++) {

      // Búa til þau box sem ég þarf
      const box = document.createElement('div'); // box sem fær mynd, nafn á videoi og tímasetningu
      const myndir = document.createElement('div'); // img div
      const imgElement = document.createElement('img');
      const duration = document.createElement('div');
      const nafn = document.createElement('h3'); // Nafn á video
      const hveGamalt = document.createElement('div');

      // Bæta við klösum fyrir CSS
      box.classList.add('poster');
      myndir.classList.add('mynd');
      duration.classList.add('duration');
      hveGamalt.classList.add('hveGamalt');
      // Setja box á rétta staði í HTML
      video.appendChild(box);
      box.appendChild(myndir);
      box.appendChild(nafn);
      box.appendChild(hveGamalt);

      // Sækja poster fyrir rétt video
      const videoID = gogn.categories[i].videos[j];
      imgElement.src = gogn.videos[videoID-1].poster;
      myndir.appendChild(imgElement);
      myndir.appendChild(duration);
      const lengd = durationToString(gogn.videos[videoID-1].duration);
      duration.appendChild(document.createTextNode(lengd));
      // Sækja og birta titil
      nafn.appendChild(document.createTextNode(gogn.videos[videoID-1].title));

      // Sækja tíma síðan video var búið til og fá viðeigandi streng til birtingar
      const timi = timiSidan(gogn.videos[videoID-1].created);
      hveGamalt.appendChild(document.createTextNode(timi));

      box.addEventListener('click', function() {
        console.log(videoID);
        const currentURL = window.location;
        window.location = currentURL + 'videos.html' + '?id=' + videoID;
      })

    }
  }
}

/* Fall sem reiknar út tímann síðan að video var búið til
*  og skilar formuðum streng */
function timiSidan(sec) {
  // Hve langt er á milli núna og hvenær videoið var búið til
  const nuna = new Date();
  const nunaSec = nuna.getTime();
  const mismunur = nunaSec - sec ;
  // Tölur sem þarf að nota og eru mjög ruglandi inni í kóðanum
  const tvoAr = 63072000000;
  const eittAr = 31536000000;
  const tveirMan = 5184000000;
  const einnMan = 2592000000;
  const tvaerVik = 1209600000;
  const einVik = 604800000;
  const tveirDag = 172800000;
  const einnDag = 86400000;
  const tvaerKlst = 7200000;
  const einKlst = 3600000;

  // Löööng if/else setning sem kemst að því hvaða texta eigi að skila
  if (mismunur > tvoAr) { // Meira en tvö ár
    var arISec = mismunur;
    var fjoldiAra = 2;
    while ((arISec - eittAr) > eittAr) {
      arISec = arISec - eittAr;
      fjoldiAra++;
    }
    return 'Fyrir ' + fjoldiAra + ' árum síðan.';
  } else if (mismunur > eittAr) { // Eitt ár
    return 'Fyrir 1 ári síðan.';
  } else if (mismunur > tveirMan) { // Meira en tveir mánuðir
    var manISec = mismunur;
    var fjoldiMan = 2;
    while ((manISec - einnMan) > einnMan) {
      manISec = manISec - einnMan;
      fjoldiMan++;
    }
    return 'Fyrir ' + fjoldiMan + ' mánuðum síðan.';
  } else if (mismunur > einnMan) { // Einn mánuður
    return 'Fyrir 1 mánuði síðan.';
  } else if (mismunur > tvaerVik) { // Meira en tvær vikur
    var vikurISec = mismunur;
    var fjoldiVikna = 2;
    while ((vikurISec - einVik) > einVik) {
      vikurISec = vikurISec - einVik;
      fjoldiVikna++;
    }
    return 'Fyrir ' + fjoldiVikna + ' vikum síðan.';
  } else if (mismunur > einVik) { // Ein vika
    return 'Fyrir 1 viku síðan';
  } else if (mismunur > tveirDag) { // Meira en tveir dagar
    var dagISec = mismunur;
    var fjoldiDaga = 2;
    while ((dagISec - einnDag) > einnDag) {
      dagISec = dagISec - einnDag;
      fjoldiDaga++;
    }
    return 'Fyrir ' + fjoldiDaga + ' dögum síðan.';
  } else if (mismunur > einnDag) { // Einn dagur
    return 'Fyrir 1 degi síðan';
  } else if (mismunur > tvaerKlst) { // Meira en tvær klukkustundir
    var klstISec = mismunur;
    var fjoldiKlst = 2;
    while ((klstISec - einKlst) > einKlst) {
      klstISec = klstISec - einKlst;
      fjoldiKlst++;
    }
    return 'Fyrir ' + fjoldiKlst + ' klukkustundum síðan.';
  } else { // Innan við ein klukkustund (minnsta eining)
    return 'Fyrir 1 klukkustund síðan';
  }
}

/* Fall sem tekur við lengd videos í sekúndum og skilar
*  því í formuðum streng. Gert er ráð fyrir að video sé
*  ekki meira en 24 klst*/
function durationToString(num) {
  // Stærðir sem þarf að nota
  const dagur = 86400;
  const klst = 3600;
  const min = 60
  const sec = 1;

  if (num > dagur) {
    return '>24:00:00'
  }
  var timi = num + 1;
  // Hve margar klukkustundir
  var klstA = 0;
  while (timi > klst)  {
    timi = timi - klst;
    klstA++;
  }
  // Hve margar mínútur
  var minA = 0;
  while (timi > min)  {
    timi = timi - min;
    minA++;
  }
  // Hve margar sekúndur
  var secA = 0;
    while (timi > sec)  {
      timi = timi - sec;
      secA++;
    }
  /* Rosa flókin if/else setning.
  *  Er skipt í tvennt til að geta birt lengd á forminu 00:00:00
  *  og þá 8 möguleikar til að bæta 0 fyrir framan töluna ef hún
  *  er minni en 10
  *  Seinni hlutinn birtir lengd á forminu 00:00 og hefur 4
  *  möguleika á að bæta 0 fyrir framan tölur minni en 10 */
  if (klstA > 0) {
    if (klstA < 10) {
      if (minA < 10) {
        if (secA < 10) {
          return '0'+ klstA + ':0' + minA + ':0' + secA;
        } else {
          return '0'+ klstA + ':0' + minA + ':' + secA;
        }
      } else if (secA < 10) {
        return '0'+ klstA + ':' + minA + ':0' + secA;
      } else {
        return '0'+ klstA + ':' + minA + ':' + secA;
      }
    } else if (minA < 10) {
        if (secA < 10) {
          return klstA + ':0' + minA + ':0' + secA;
      } else {
        return klstA + ':0' + minA + ':' + secA;
      }
    } else if (secA < 10) {
      return klstA + ':' + minA + ':0' + secA;
    } else {
      return klstA + ':' + minA + ':' + secA;
    }
  } else {
    if (minA < 10) {
      if (secA < 10) {
        return '0' + minA + ':0' + secA;
      } else {
        return '0' + minA + ':' + secA;
      }
    } else {
      if (secA < 10) {
        return minA + ':0' + secA;
      } else {
        return minA + ':' + secA;
      }
    }
  }
}
