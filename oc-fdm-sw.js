importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'); 

var CACHE_VERSION = 3;
var CURRENT_CACHES = {
  prefetch: 'prefetch-cache-vp-fdm-ltc-v' + CACHE_VERSION
};

//Page Link Example:
//https://asimut.github.io/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/index.html
var pageLink = 'https://asimut.github.io/VP-FDM-LTC/';

workbox.setConfig({ debug: true });

self.addEventListener('install', function(event) {
  let ok,
    libjs = ['player-0.0.11.min', 'main.bundle', 'lzwcompress'],
    libcss = ['main.bundle', 'icomoon'],
    libfonts = ['icomoon', 'Lato-Black', 'Lato-Bold', 'Lato-Italic', 'Lato-Light', 'Lato-Regular'],
    assets =[
      '0DNP9xTHgzaIrz7y_nNF_8JAH3JQIy4C3.svg',
      '0kVSDyT6yQB9TTqY_yjZQLNQnL37VJ8Ca.png',
      '0vZIxK9lx4iSgLck_j0QP4VpqpRUbq5Ez.png',
      '0ZvOM7zcaqcUjS0A_MnbOxGzPiF0rgjfF.png',
      '1aBBsOHF_tKuWfcN_transcoded-eZ9E531W2YCH-5Jd-upper-limbs.mp4',
      '1xb4Rfe7tU-8bi8y_transcoded-LalaPRKzNnds7fOX-lower-limbs.mp4',
      '2_VKdGQcGpoJgoEq_KEzpUfBEn0Az1Ge-.png',
      '3al_QcUqee75G7lW_ykYH-2sOuLlt3xBh.svg',
      '3YBww2gXJmfG-dkc_zZq-bPMAXR15ya9M.png',
      '5bmFOEXWJl-epbVo_transcoded-rYO1lHqrO4rTMrlo-Martin_6Weeks-00001.png',
      '5IB5rdP4vuSw3k5I_pSQRJWXMj0UNOWMg-INGREZZA-Full-Prescribing-Information.pdf',
      '6eAzeQOIweLcTRlI_4_cities.jpg',
      '6zUy8ivFv6lu3NFM_xjtdAjOCCz1xQ56W.png',
      '8X6XphXYDlY0hfM9_87lR_1YbKaT0xj89.svg',
      '14xjGlGNBDhiW-m5_transcoded-cuFpRjmcAvLPRgBF-Martin_Baseline-00001.png',
      '51R5ZYJsmuaQ_WW-_e_xujU5j_OLzuM4p.png',
      '52Bz1u8eosWYBaGD_transcoded-LvBEHhN3GT1Cnf8U-Gloria_6Weeks.mp4',
      '61jHj1102I7MyYRh_g8bPw1K2DEpVFpcA.svg',
      'AjjIHrAE-R3qqWc1_NAglbQI4L5aMZlWz.svg',
      'Aysff0t2cAjgT1gt_ieFIJ8yYnkhzudaH.svg',
      'B5LfvBAyvf4Vpja1_small_1579124541.png',
      'Bf46MDBFLlzYRGle_hqZ8CPfolZhlRpSn.png',
      'BVuIn-HZycn_GZml_G5c__lWMeoUcW8eJ.png',
      'ChbpbvclfbydIK7l_VYuYI7nIrxHxvabA.svg',
      'D8k8IYGt4CoHCKBn_mYWpiGscet6aDTb7.png',
      'dSvrH_FM5Y_4OGvF_uh4dqE7zsUI2r1wB.png',
      'dt1deEo47yUa5Npf_9_OaSN0gZxqw1dV1.svg',
      'DTQ6W22kwWI91JdV_N1-UfLnIhcQWsJBy.png',
      'dTRkr3YRjwrFyMbt_LUi5YO0ctCiLxyfK-Full Prescribing Information.pdf',
      'dwTxOg2U65IX-j6k_J_FVNfk8t0zWFs9F.png',
      'EDHWNt7fDz2aTntT_oIvQVO0kU3JbZteJ.svg',
      'gnIIGUBdE-ag_-XM_transcoded-rJfHogn6SIOhVT3v-Jane_Baseline.mp4',
      'gOxX6cC7xp0R3JnD_p5OCBEEwEmLb_bEs.svg',
      'GZPTZ-GrA2rbGHvL_l4DwlC6Zyzh7p3yI.svg',
      'hayNaHIN3HtodkK0_mUC3DORyoD6E4WAi.png',
      'hbsBMMsjzHsJTi9V_transcoded-p3ZW65hnn88TuGUm-Jane_48Weeks.mp4',
      'HoLEYkXc6rh4x76F_GpzbeCJLaV67eZ1P.svg',
      'HpE4miG-I4TeRK99_transcoded-6F-kinz-Um3SBb7u-Gloria_Baseline-00001.png',
      'hYVWAUwLZh5GLuPK_P1c5WYGq3jg-mCNZ.png',
      'I4ORsLyjNlQ1QcgA_eBNFJIOYzNOhWZYQ.svg',
      'iRVme6bzX6plme6U_rbbCcjDvWWgedPLb.png',
      'IsHYnhW8Pj6LEeh__transcoded-cyqlI9DTLppcN8Vk-torso-00001.png',
      'IWdhM9II4diA8JKK_transcoded--p-K0T8ihC0O0NHv-Ed_8Weeks.mp4',
      'j_agZedeAvGZoj4s_pUKlA_ZN5HnDD-9s.svg',
      'j58SfCa_N4rGx17e_transcoded-cyqlI9DTLppcN8Vk-torso.mp4',
      'jf_Zi6_yMFQXJhs5_transcoded-kd_IwTb56uWFyUbl-Ed_Baseline.mp4',
      'JkkrrecWDb_0xcAU_Sz_vyJhC9P2kae6N.png',
      'k1sMhwYLaz_DLIcn_transcoded-EIG8-_2SuQtTgoae-Sue_Baseline-00001.png',
      'KKNJN1nHLrqXqHuP_transcoded--p-K0T8ihC0O0NHv-Ed_8Weeks-00001.png',
      'kKppmkpKH1stIW29_rirvyWZ-Z8H5N5WU.png',
      'LrYZ-VxxW4aRr1jK_transcoded-kd_IwTb56uWFyUbl-Ed_Baseline-00001.png',
      'Ls0ca7eyeEsvt4KK_transcoded-rYO1lHqrO4rTMrlo-Martin_6Weeks.mp4',
      'MBKF5DUMVLzbmzIb_Q0fKDZtYxc315r7W.png',
      'mhTnIfl16RXWd6-O_SHJprNBfEAJsor0T.svg',
      'MifmOKw8BPB4w_Z1_XUkQ0oUg1ipb3NR2.svg',
      'mNunqqbl5qY9H8Cb_transcoded-QDqKCPlPruDgXj5--Gloria_2Weeks.mp4',
      'MWld66MsCjfwweKc_transcoded-t9PVyavmR7KoJT-W-Jane_6Weeks.mp4',
      'Mz1fFGVTORlkKZoS_-n9YNqPAl_oHkUcM.svg',
      'nYnIq_NAJQtqVjbx_6IZvN3VbvJfZuVSv.png',
      'OIKHM0Ujmkx7xx80_v4Nycn7yZATmh8Ni.png',
      'OQLNXboheCQEON1F_13hdjUb-c0yHwHk_.svg',
      'osf5TKWgftGLZiFU_no6UxbNTeWok2n3A.svg',
      'pgdUjh0nrDinF-4L_transcoded-cuFpRjmcAvLPRgBF-Martin_Baseline.mp4',
      'PO46lezh5LtI7VA0_transcoded-QDqKCPlPruDgXj5--Gloria_2Weeks-00001.png',
      'pp0meWZgLPwqGzBa_transcoded-LalaPRKzNnds7fOX-lower-limbs-00001.png',
      'QfiJDx04X9aXhVnm_00iaS05tFptaeCbk.png',
      'ReOEVabrnIi56Hoh_transcoded-rJfHogn6SIOhVT3v-Jane_Baseline-00001.png',
      'rkU_GDlQ09UoQfha_uFTveUW5EV5h6MiN.png',
      'r-xMy6OmtHU6aKO3_transcoded-WrsXiZUS_HBNp3RL-Sue_48Weeks-00001.png',
      'SXKBJfPGBDJqW9Yh_transcoded-WrsXiZUS_HBNp3RL-Sue_48Weeks.mp4',
      'sz1_rHbh5ju7oVY2_LtxkH4s7Nriha1gg.png',
      'ToVccYSv1_dxxTS-_transcoded-6iZM7VOHmGoVJ7qg-lips.mp4',
      'twDjwYMbdwqGEUwU_ZS0Y6uc5n2amivaW.png',
      'UEP23pq6X7IkRu-w_transcoded-p3ZW65hnn88TuGUm-Jane_48Weeks-00001.png',
      'Vg3ERK4kX9zZ5Jgj_transcoded-t9PVyavmR7KoJT-W-Jane_6Weeks-00001.png',
      'VGOkXTReIS00rZm4_ZPmBKRlu0OrtPMw2.svg',
      'W8zX2iyjNbYjDZhI_transcoded-eZ9E531W2YCH-5Jd-upper-limbs-00001.png',
      'wXwRoCNDr9fIDVn-_example-header-image.jpg',
      'X_O3eWW98ht6fY8R_small.png',
      'X9v27JONx1-cAnDP_NBHp-T8rKyyTdSzh.png',
      'X172DW3hBG0-rMrM_transcoded-6iZM7VOHmGoVJ7qg-lips-00001.png',
      'xaTb_4z3YowcQO9T_OrQX187Z-zJRRNYT.svg',
      'XaUhQKxEyfs-eKku_YTyU0bPGcgSPuqVN.png',
      'XGHXW2TwMx6z63uA_lHtwpeq8m4E6AHwF.svg',
      'Xjbdlw0L6lvzj77p_W5UNh2WCWjwE5PnY.svg',
      'XjPW_YE7DnT8H26y_transcoded-6F-kinz-Um3SBb7u-Gloria_Baseline.mp4',
      'XwmDA3SgRikXtq8i_transcoded-Ej_YvFp67do0WgIJ-Sue_6Weeks.mp4',
      'XwnnpQw666TDNn8k_transcoded-EIG8-_2SuQtTgoae-Sue_Baseline.mp4',
      'XZRDbI91iIrY_dRq_transcoded-LvBEHhN3GT1Cnf8U-Gloria_6Weeks-00001.png',
      'yfHqCZVXlpMhzV-T_GEJmaWhVU7yhIAU-.svg',
      'YKHdHHM66brqYYbR_ZV9sVhdLLPr5_C8F.svg',
      'YmW9EsUK37cYb4Cq_PHLmhIlmx9cDoQPR.png',
      'YrY9Te8d9aQKBgSK_C88oIjnBMA5EDKh6.svg',
      'YZmsAInUUPOl-8Gt_Q_E9xlPksi9HxuVl.png',
      'z4RmTtlhIQFTGEun_d9U3AKfdex_kRXGd.png',
      'ZCwEZb5XcmhnzHKg_eg2U9dbqW5iiA1gu.png',
      'ZrShYhNHySdHAadJ_transcoded-Ej_YvFp67do0WgIJ-Sue_6Weeks-00001.png',
      'zWQnPa5_Qxr3w-y8_3wcDpAmAcE2Xyp7a.png',
      'zzYUA82JXB_Fpb_C_quote_background.jpg'
    ];
  var urlsToPrefetch = [
      pageLink,
      pageLink+'index.html',
      ...libjs.map(i => pageLink+'lib/' + i + '.js'),
      ...libcss.map(i => pageLink+'lib/' + i + '.css'),
      ...libfonts.map(i => pageLink+'lib/fonts/' + i + '.woff'),
      pageLink+'lib/fonts/icomoon.ttf',
      pageLink+'assets/custom/jquery-3.6.0.min.js',
      pageLink+'assets/custom/script.js',
      pageLink+'assets/custom/style.css',
      pageLink+'assets/custom/arrow_down.png',
      pageLink+'assets/custom/chat.svg',
      pageLink+'assets/custom/check.svg',
      pageLink+'assets/custom/cover_logo.png',
      pageLink+'assets/custom/down-arrow.svg',
      pageLink+'assets/custom/ingrezza-valbenazine-logo-n.svg',
      pageLink+'assets/custom/logo-modal.png',
      pageLink+'assets/custom/open-book.svg',
      ...assets.map(i => pageLink+'assets/' + i),
      pageLink+'oc-fdm-sw.js',
      pageLink+'manifest.json',
      pageLink+'152.png',
      pageLink+'144.png',
      pageLink+'64.png',
      pageLink+'32.png',
      pageLink+'android-launchericon-512-512.png'
  ];

  // All of these logging statements should be visible via the "Inspect" interface
  // for the relevant SW accessed via chrome://serviceworker-internals
  console.log('Handling install event. Resources to prefetch:', urlsToPrefetch);

  // self.skipWaiting();

  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch).then(async (cache) => {
      return cache.addAll(urlsToPrefetch);      
    }).then(() => {
      console.log('All files were successfully cached.');

      caches.open(CURRENT_CACHES.prefetch).then(cache => {
        cache.keys()
        .then(requests => console.log(requests))
      })

      self.skipWaiting();
    })
  );

});

self.addEventListener('activate', function(event) {
  // Delete all caches that aren't named in CURRENT_CACHES.
  // While there is only one cache in this example, the same logic will handle the case where
  // there are multiple versioned caches.
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            // If this cache name isn't present in the array of "expected" cache names, then delete it.
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
        );
    })
    );    
});

self.addEventListener('fetch', function(event) {
  
  headersLog = [];
  for (var pair of event.request.headers.entries()) {
    console.log(pair[0]+ ': '+ pair[1]);
    headersLog.push(pair[0]+ ': '+ pair[1])
 }
 console.log('Handling fetch event for', event.request.url, JSON.stringify(headersLog));

  if (event.request.headers.get('range')) {
    console.log('Range request for', event.request.url);
    var rangeHeader=event.request.headers.get('range');
    var rangeMatch =rangeHeader.match(/^bytes\=(\d+)\-(\d+)?/)
    var pos =Number(rangeMatch[1]);
    var pos2=rangeMatch[2];
    if (pos2) { pos2=Number(pos2); }
    
    console.log('Range request for '+ event.request.url,'Range: '+rangeHeader, "Parsed as: "+pos+"-"+pos2);
    event.respondWith(
      caches.open(CURRENT_CACHES.prefetch)
      .then(function(cache) {
        return cache.match(event.request.url);
      }).then(function(res) {
        if (!res) {
          console.log("Not found in cache - doing fetch")
          return fetch(event.request)
          .then(res => {
            console.log("Fetch done - returning response ",res)
            return res.arrayBuffer();
          });
        }
        console.log("FOUND in cache - doing fetch")
        return res.arrayBuffer();
      }).then(function(ab) {
        console.log("Response procssing")
        let responseHeaders=  {
          status: 206,
          statusText: 'Partial Content',
          headers: [
            ['Content-Type', 'video/mp4'],
            ['Content-Range', 'bytes ' + pos + '-' + 
            (pos2||(ab.byteLength - 1)) + '/' + ab.byteLength]]
        };
        
        console.log("Response: ",JSON.stringify(responseHeaders))
        var abSliced={};
        if (pos2>0){
          abSliced=ab.slice(pos,pos2+1);
        }else{
          abSliced=ab.slice(pos);
        }
        
        console.log("Response length: ",abSliced.byteLength)
        return new Response(
          abSliced,responseHeaders
        );
      }));
  } else {
    console.log('Non-range request for', event.request.url);
    event.respondWith(
    // caches.match() will look for a cache entry in all of the caches available to the service worker.
    // It's an alternative to first opening a specific named cache and then matching on that.
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found response in cache:', response);
        return response;
      }
      console.log('No response found in cache. About to fetch from network...');
      // event.request will always have the proper mode set ('cors, 'no-cors', etc.) so we don't
      // have to hardcode 'no-cors' like we do when fetch()ing in the install handler.
      return fetch(event.request).then(function(response) {
        console.log('Response from network is:', response);

        return response;
      }).catch(function(error) {
        // This catch() will handle exceptions thrown from the fetch() operation.
        // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
        // It will return a normal response object that has the appropriate error code set.
        console.error('Fetching failed:', error);

        throw error;
      });
    })
    );
  }
});
