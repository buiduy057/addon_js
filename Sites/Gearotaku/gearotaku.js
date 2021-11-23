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
  window.location.href.indexOf("https://www.gearotaku.com") > -1 ||
  window.location.href.indexOf("https://gearotaku.com") > -1
) {
  if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          const category = url_string.slice(
            url_string.lastIndexOf("/") + 1,
            url_string.length
          );
          // console.log(category);
          const urlId = `https://www.gearotaku.com/api/catalog/collections_v2.json?handles=${category}`;
          const rqId = await fetch(urlId);
          const Id = await rqId.json();
          // console.log(urlId);
          const urlRequest = `https://www.gearotaku.com/api/catalog/products_v2.json?sort_field=created_at&sort_direction=desc&limit=12&page=${page}&minimal=true&collection_ids=${Id.collections[0].id}`;
          const rq = await fetch(urlRequest);
          const body = await rq.json();
          // console.log(body);
          for (const item of body.products) {
            const Item = item.id;
            const linkItem = `https://api.shopbase.com/v1/recsys/get-cross-sell-products/v3/10119168?product_id=${Item}&total_product=2`;
            urlProducts.push(linkItem);
          }
          // console.log(urlProducts);
          const urlsUnique = [...new Set(urlProducts)];

          for (const path of urlsUnique) {
            try {
              // console.log(path);
              const rqPath = await fetch(path);
              const bodyPath = await rqPath.json();
              // console.log(bodyPath);
              const dataPath = bodyPath.products[0];
              // console.log(dataPath);
              const title = dataPath.title;
              const description = dataPath.description;
              const tags = dataPath.tags;
              let option1_name = dataPath.options[0].label;
              let option2_name = dataPath.options[1].label;
              let option3_name =
                dataPath.options[2] !== undefined
                  ? dataPath.options[2].label
                  : "";
              const images_arr = [];
              for (const item of dataPath.images) {
                const itemVariant = {
                  img: item.src,
                };
                for (const itemvarr of item.variant_ids) {
                  const itemVariant2 = {
                    ...itemVariant,
                    varrId: itemvarr,
                  };
                  images_arr.push(itemVariant2);
                }
              }
              const type_arr = [];
              for (const item of dataPath.options[0].values) {
                const arr = [];
                arr.push(item.id);
                arr.push(item.label);
                type_arr.push(arr);
              }
              const size_arr = [];
              for (const item of dataPath.options[1].values) {
                const arr = [];
                arr.push(item.id);
                arr.push(item.label);
                size_arr.push(arr);
              }
              if (dataPath.options[2] !== undefined) {
                const color_arr = [];
                for (const item of dataPath.options[2].values) {
                  const arr = [];
                  arr.push(item.id);
                  arr.push(item.label);
                  color_arr.push(arr);
                }
              }

              let variants_arr = [];
              for (const item of dataPath.variants) {
                const itemVariant = {
                  sku: item.sku,
                  option1: checkOptionGe(item.option1, type_arr),
                  option2: checkOptionGe(item.option2, size_arr),
                  option3:
                    dataPath.options[2] !== undefined
                      ? checkOptionGe(item.option3, color_arr)
                      : "",
                  var_images: CheckImgGe(item.id, images_arr),
                  price: item.price - 2,
                  origin_price: true,
                  shipping_cost: 0,
                  quantity: 9999,
                };
                variants_arr.push(itemVariant);
              }
              // console.log(variants_arr);
              // console.log(variants_arr);
              let listCate = ["T-SHIRT"];
              tit = title + " " + makeid(10);
              product = {};
              ggcate = filterCategory(tit);
              product["domain"] = "customray.com";
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = "gearotaku";
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
              // console.log(JSON.stringify(product));
              send(product, "gearotaku");
              // break;

              // break;
            } catch (e) {
              console.error(e);
            } finally {
              await timeOut(800);
            }
          }
        } catch (e) {
          console.error(e);
        }

        getPage(++page);
      }
      getPage();
    });
  }
}
function CheckImgGe(id, arr) {
  let img = [];
  for (const item of arr) {
    const itemN = Object.values(item);
    // console.log(arr_N);
    if (id === itemN[1]) {
      img.push(itemN[0]);
      return img;
    }
  }
}
function checkOptionGe(id, arr) {
  for (const item of arr) {
    if (id === item[0]) {
      return item[1];
    }
  }
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
