// Klassískt fall sem tæmir element
function empty(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}
/* Fall sem tekur við lengd videos í sekúndum og skilar
*  því í formuðum streng. Gert er ráð fyrir að video sé
*  ekki meira en 24 klst */
function durationToString(num) {
  // Stærðir sem þarf að nota
  const dagur = 86400;
  const klst = 3600;
  const min = 60;
  const sec = 1;

  if (num > dagur) {
    return '>24:00:00';
  }
  let timi = num + 1;
  // Hve margar klukkustundir
  let klstA = 0;
  while (timi > klst) {
    timi -= klst;
    klstA += 1;
  }
  // Hve margar mínútur
  let minA = 0;
  while (timi > min) {
    timi -= min;
    minA += 1;
  }
  // Hve margar sekúndur
  let secA = 0;
  while (timi > sec) {
    timi -= sec;
    secA += 1;
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
          return '0'+ klstA + ':0' + minA + ':0' + secA; // eslint-disable-line
        }
        return '0'+ klstA + ':0' + minA + ':' + secA; // eslint-disable-line
      } else if (secA < 10) {
        return '0'+ klstA + ':' + minA + ':0' + secA; // eslint-disable-line
      }
      return '0'+ klstA + ':' + minA + ':' + secA; // eslint-disable-line
    } else if (minA < 10) {
      if (secA < 10) {
        return klstA + ':0' + minA + ':0' + secA; // eslint-disable-line
      }
      return klstA + ':0' + minA + ':' + secA; // eslint-disable-line
    } else if (secA < 10) {
      return klstA + ':' + minA + ':0' + secA; // eslint-disable-line
    }
    return klstA + ':' + minA + ':' + secA; // eslint-disable-line
  }
  if (minA < 10) {
    if (secA < 10) {
      return '0' + minA + ':0' + secA; // eslint-disable-line
    }
    return '0' + minA + ':' + secA; // eslint-disable-line
  }
  if (secA < 10) {
    return minA + ':0' + secA; // eslint-disable-line
  }
  return minA + ':' + secA; // eslint-disable-line
}
/* Fall sem reiknar út tímann síðan að video var búið til
*  og skilar formuðum streng */
function timiSidan(sec) {
  // Hve langt er á milli núna og hvenær videoið var búið til
  const nuna = new Date();
  const nunaSec = nuna.getTime();
  const mismunur = nunaSec - sec;
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
    let arISec = mismunur;
    let fjoldiAra = 2;
    while ((arISec - eittAr) > eittAr) {
      arISec -= eittAr;
      fjoldiAra += 1;
    }
    return 'Fyrir ' + fjoldiAra + ' árum síðan.'; // eslint-disable-line
  } else if (mismunur > eittAr) { // Eitt ár
    return 'Fyrir 1 ári síðan.';
  } else if (mismunur > tveirMan) { // Meira en tveir mánuðir
    let manISec = mismunur;
    let fjoldiMan = 2;
    while ((manISec - einnMan) > einnMan) {
      manISec -= einnMan;
      fjoldiMan += 1;
    }
    return 'Fyrir ' + fjoldiMan + ' mánuðum síðan.'; // eslint-disable-line
  } else if (mismunur > einnMan) { // Einn mánuður
    return 'Fyrir 1 mánuði síðan.';
  } else if (mismunur > tvaerVik) { // Meira en tvær vikur
    let vikurISec = mismunur;
    let fjoldiVikna = 2;
    while ((vikurISec - einVik) > einVik) {
      vikurISec -= einVik;
      fjoldiVikna += 1;
    }
    return 'Fyrir ' + fjoldiVikna + ' vikum síðan.'; // eslint-disable-line
  } else if (mismunur > einVik) { // Ein vika
    return 'Fyrir 1 viku síðan';
  } else if (mismunur > tveirDag) { // Meira en tveir dagar
    let dagISec = mismunur;
    let fjoldiDaga = 2;
    while ((dagISec - einnDag) > einnDag) {
      dagISec -= einnDag;
      fjoldiDaga += 1;
    }
    return 'Fyrir ' + fjoldiDaga + ' dögum síðan.'; // eslint-disable-line
  } else if (mismunur > einnDag) { // Einn dagur
    return 'Fyrir 1 degi síðan';
  } else if (mismunur > tvaerKlst) { // Meira en tvær klukkustundir
    let klstISec = mismunur;
    let fjoldiKlst = 2;
    while ((klstISec - einKlst) > einKlst) {
      klstISec -= einKlst;
      fjoldiKlst += 1;
    }
    return 'Fyrir ' + fjoldiKlst + ' klukkustundum síðan.'; // eslint-disable-line
  }
  // Innan við ein klukkustund (minnsta eining)
  return 'Fyrir 1 klukkustund síðan';
}
/* Fall sem sér um að birta gögnin sem búið er að sækja */
function show(gogn) {
  // Byrjar á að finna hvað á að birta marga flokka af videoum
  for (let i = 0; i < gogn.categories.length; i += 1) {
    const div = document.querySelector('.yfirlit'); // Eina div sem er harðkóðað í HTML
    const flokkur = document.createElement('div'); // Div fyrir hvern flokk
    const fyrirsogn = document.createElement('h2'); // Div fyrir fyrirsogn
    const video = document.createElement('div'); // Heldur utan um allt inni í flokknum
    const lina = document.createElement('hr'); // Lína á milli flokka

    // Bæta klösum fyrir CSS vinnu
    flokkur.classList.add('flokkur');
    fyrirsogn.classList.add('fyrirsogn');
    video.classList.add('videoposter');

    // Birti fyrirsögn á flokknum
    if (gogn.categories[i].title === 'undefined') {
      fyrirsogn.appendChild(document.createTextNode('Flokkur fannst ekki.'));
    } else {
      fyrirsogn.appendChild(document.createTextNode(gogn.categories[i].title));
    }

    // Set boxin í hverjum flokk á réttan stað
    div.appendChild(flokkur);
    flokkur.appendChild(fyrirsogn);
    flokkur.appendChild(video);
    flokkur.appendChild(lina);
    // Fer í gegnum hvaða video á að birta í hverjum flokk
    for (let j = 0; j < gogn.categories[i].videos.length; j += 1) {
      // Búa til þau box sem ég þarf
      const box = document.createElement('div'); // box sem fær mynd, nafn á videoi og tímasetningu
      const myndir = document.createElement('div'); // img div
      const imgElement = document.createElement('img'); // Mynd fyrir video
      const duration = document.createElement('div'); // Lengd á video, fer í overlay
      const nafn = document.createElement('div'); // Nafn á video
      const hveGamalt = document.createElement('div'); // Tími frá því að video var póstað

      // Bæta við klösum fyrir CSS vinnu
      box.classList.add('poster');
      myndir.classList.add('mynd');
      duration.classList.add('duration');
      hveGamalt.classList.add('hveGamalt');
      nafn.classList.add('nafn');

      // Setja box á rétta staði í HTML
      video.appendChild(box);
      box.appendChild(myndir);
      box.appendChild(nafn);
      box.appendChild(hveGamalt);

      // Sækja poster fyrir rétt video
      const videoID = gogn.categories[i].videos[j];
      // Tékka hvort að poster finnist
      if (gogn.videos[videoID - 1] === undefined) {
        const error = document.createElement('p');
        nafn.appendChild(error);
        error.appendChild(document.createTextNode('Fannst ekki.'));
      } else {
        imgElement.src = gogn.videos[videoID - 1].poster;
      }
      myndir.appendChild(imgElement);
      myndir.appendChild(duration);

      // Tékka hvort að Duration finnist
      if (gogn.videos[videoID - 1] !== undefined) {
        const lengd = durationToString(gogn.videos[videoID - 1].duration);
        duration.appendChild(document.createTextNode(lengd));
      }

      // Sækja og birta titil
      if (gogn.videos[videoID - 1] !== undefined) {
        nafn.appendChild(document.createTextNode(gogn.videos[videoID - 1].title));
      }

      // Sækja tíma síðan video var búið til og fá viðeigandi streng til birtingar
      if (gogn.videos[videoID - 1] !== undefined) {
        const timi = timiSidan(gogn.videos[videoID - 1].created);
        hveGamalt.appendChild(document.createTextNode(timi));
      }

      // Event listener á hvert box til að fara yfir á rétt video
      box.addEventListener('click', () => {
        const currentURL = window.location;
        currentURL.replace('index.html', '');
        window.location = 'videos.html' + '?id=' + videoID; // eslint-disable-line
      });
    }
  }
}

/* Fallið sem sækir gögn í .json skrá með ajax og kallar svo á
*  fall sem sér um að birta gögn */
function jsonRequest() {
  const request = new XMLHttpRequest();
  request.open('GET', 'videos.json', true);
  // Setja loading gif meðan gögn eru sótt og unnið með þau
  const yfirlit = document.querySelector('.yfirlit');
  const loading = document.createElement('img');
  loading.src = 'loading.gif';
  yfirlit.appendChild(loading);
  // Parsa og keyri show() ef statuskóði er 200
  request.onload = () => {
    if (request.status === 200) {
      const data = JSON.parse(request.response);
      empty(yfirlit);
      show(data);
    } else {
      empty(yfirlit);
      yfirlit.appendChild(document.createTextNode('Ekki tókst að sækja skrá.'));
    }
  };
  request.onerror = () => {
    empty(yfirlit);
    yfirlit.appendChild(document.createTextNode('Villa kom upp.'));
  };
  request.send();
}

document.addEventListener('DOMContentLoaded', () => {
  jsonRequest();
});
