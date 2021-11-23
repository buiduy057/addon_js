var designed = false;
chrome.storage.local.get("designed", function (items) {
  designed = items.designed;
});

var trending = false;
chrome.storage.local.get("trending", function (items) {
  trending = items.trending;
});

// FUNCTION
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

function get(name) {
  if (
    (name = new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)").exec(
      location.search
    ))
  )
    return decodeURIComponent(name[1]);
}

function send(item, vender) {
  // console.log(item);
  $.ajax({
    url: "https://api.customray.com/admin/product/create-tool",
    type: "post",
    dataType: "text",
    data: {
      item: JSON.stringify(item),
    },

    vender: vender,
    success: function (data) {
      console.log(data);
      // console.log(this.next);
      // window.close();
    },
    error: function (request, error) {
      console.log(data);

      // var url_string  = window.location.href;
      // window.location.href = url_string;
      // window.close();
    },
  });
}

function send_update(atokproduct_id) {
  $.ajax({
    url: "https://asyourprint.sale/admin/product/update-tool",
    type: "post",
    dataType: "text",
    data: {
      atokproduct_id: atokproduct_id,
    },
    success: function (data) {
      console.log(data);
      // console.log(this.next);
      // window.close();
    },
    error: function (request, error) {
      console.log(data);

      // var url_string  = window.location.href;
      // window.location.href = url_string;
      // window.close();
    },
  });
}

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  getPage();
});
if (window.location.href.indexOf("https://xx.com") > -1) {
  console.log("404");
} else if (
  window.location.href.indexOf("https://www.dls-store.com") > -1 ||
  window.location.href.indexOf("https://dls-store.com") > -1
) {
  $(window).ready(function () {
    var url_string = window.location.href;
    async function getPage(page = 2) {
      try {
        let urlProducts = [];
        console.log(`page=${page}`);
        const cursor = page - 1;
        const rqReqest = await fetch(url_string);
        const body = await rqReqest.text();
        const variants = body.match(/var globalStorefrontJson = (.*?)};\n/);
        const variantBody = JSON.parse(variants[1] + "}");
        // console.log(variantBody);
        let link01 = `https://dls-store.com/api/storefrontpage/${variantBody.key}/campaigns?cursor=${cursor}&limit=20`;
        const rqJson = await fetch(link01);
        const bodyJson = await rqJson.json();
        // console.log(bodyJson);
        for (const item of bodyJson.results) {
          const href = `https://dls-store.com/${item.path}`;
          urlProducts.push(href);
        }
        const urlsUnique = [...new Set(urlProducts)];

        for (const path of urlsUnique) {
          try {
            // console.log(path);
            const rqPath = await fetch(path);
            const bodyPath = await rqPath.text();
            const variantsPath = bodyPath.match(/var globalCampaign = (.*?)};/);
            const variantData = JSON.parse(variantsPath[1] + "}");
            // console.log(variantData);
            const stringify = JSON.stringify(variantData);
            let dataProduct_02 = stringify.replace(/@id/gi, "id");
            let dataProduct_03 = dataProduct_02.replace(/@ref/gi, "id");
            const dataPath = JSON.parse(dataProduct_03);
            console.log(dataPath);
            // const dataPath = bodyPath.products[0];
            // console.log(dataPath);
            const title = dataPath.name;
            const description = dataPath.description;
            const tags = dataPath.tags.toString();
            let option1_name = "Styles";
            let option2_name = "Colors";
            let option3_name = "Dimension";
            const size_arr = [];
            for (i = 0; i <= dataPath.variants.length - 1; i++) {
              for (j = 0; j <= dataPath.variants[i].colors.length - 1; j++) {
                for (
                  m = 0;
                  m <= dataPath.variants[i].colors[j].sizes.length - 1;
                  m++
                ) {
                  if (
                    dataPath.variants[i].colors[j].sizes[m].name !== undefined
                  ) {
                    let arr = [];
                    arr.push(dataPath.variants[i].colors[j].sizes[m].id);
                    arr.push(dataPath.variants[i].colors[j].sizes[m].name);
                    size_arr.push(arr);
                  }
                }
              }
            }
            let variants_arr = [];
            for (const item of dataPath.variants) {
              const itemVariant = {
                sku: item.id,
                option1: item.name,
                price: Number(item.price.str) - 2,
                origin_price: true,
                shipping_cost: 0,
                quantity: 9999,
              };
              for (const itemcolor of item.colors) {
                const itemVariant2 = {
                  ...itemVariant,
                  hex: itemcolor.hex,
                  option2: itemcolor.name,
                  var_images: CheckImgDl(itemcolor.images),
                };
                if (itemcolor.sizes.length > 2) {
                  for (const itemSize of itemcolor.sizes) {
                    const itemVariant3 = {
                      ...itemVariant2,
                      option3: CheckSizeDl(itemSize.id, size_arr),
                    };
                    variants_arr.push(itemVariant3);
                  }
                } else {
                  for (const itemSize of itemcolor.sizes) {
                    const itemVariant3 = {
                      ...itemVariant2,
                      option3: "One Size",
                    };
                    variants_arr.push(itemVariant3);
                  }
                }
              }
            }

            let listCate = ["T-SHIRT"];
            tit = title + " " + makeid(10);
            product = {};
            ggcate = filterCategory(tit);
            product["domain"] = "customray.com";
            product["title"] = title + " " + makeid(10);
            product["categories"] = listCate;
            product["google_category"] = ggcate;
            product["gender"] = "All";
            product["vender"] = "dls-store";
            product["vender_url"] = path;
            product["description"] = description;
            product["images"] = variants_arr[0].var_images;
            product["variants"] = variants_arr;
            product["designed"] = -1;
            product["trending"] = trending === true ? 1 : 0;
            product["feedback"] = null;
            product["tags"] = tags;
            product["rank"] = null;
            product["vender_id"] = dataPath.id;
            product["specifics"] = null;
            product["option1_name"] = option1_name;
            product["option2_name"] = option2_name;
            product["option3_name"] = option3_name;
            product["option1_picture"] = 1;
            product["delivery_date_min"] = 5;
            product["delivery_date_max"] = 20;
            product["shipping_service_name"] = "Economy Shipping";
            product["location"] = "USA";
            console.log(JSON.stringify(product));
            // send(product, "dls-store");
            // break;
            break;
          } catch (e) {
            console.error(e);
          } finally {
            await timeOut(800);
          }
        }
      } catch (e) {
        console.error(e);
      }

      // getPage(++page);
    }
    getPage();
  });
}
function CheckSizeDl(id, arr) {
  for (const item of arr) {
    if (id === item[0]) {
      return item[1];
    }
  }
}
function CheckImgDl(img) {
  let arr = [];
  arr.push(img.FRONT);
  arr.push(img.BACK);
  return arr;
}

function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
