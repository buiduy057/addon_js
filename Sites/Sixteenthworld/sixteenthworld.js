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
    url: "https://api.teearechill.com/admin/product/create-tool",
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
  window.location.href.indexOf("https://www.sixteenthworld.com") > -1 ||
  window.location.href.indexOf("https://sixteenthworld.com") > -1
) {
  if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      let page_arr = [];

      console.log(page_arr);
      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          // console.log(page_arr);
          const urlRequest = `https://www.sixteenthworld.com/api/catalog/products_v2.json?sort_field=created_at&sort_direction=desc&limit=12&page=${page}&collection_ids=86733640683`;
          // console.log(urlRequest);
          const rq = await fetch(urlRequest);
          const body = await rq.json();
          for (const item of body.products) {
            const Item = `https://www.sixteenthworld.com/api/catalog/product.json?handle=${item.handle}`;
            urlProducts.push(Item);
          }
          const urlsUnique = [...new Set(urlProducts)];
          // console.log(data);

          for (const path of urlsUnique) {
            try {
              // console.log(path);
              const rqPath = await fetch(path);
              const bodyPath = await rqPath.json();

              // console.log(bodyPath);
              let title = bodyPath.name;
              // console.log(title);
              let tags = "hunting,fishing,camping";
              let description = bodyPath.description;
              let images_arr = [];
              for (const item of bodyPath.media_gallery) {
                images_arr.push(item.image);
              }
              // images_arr.push(bodyPath.thumbnail);
              // console.log(images_arr);
              let option1_name = bodyPath.configurable_options[0].label;
              let option2_name =
                bodyPath.configurable_options[1] !== undefined
                  ? bodyPath.configurable_options[1].label
                  : "";
              let option3_name =
                bodyPath.configurable_options[2] !== undefined
                  ? bodyPath.configurable_options[2].label
                  : "";
              const type_arr = [];
              for (
                let j = 0;
                j <= bodyPath.configurable_options[0].values.length - 1;
                j++
              ) {
                const arr = [];
                const Item = bodyPath.configurable_options[0].values[j].label;
                const id =
                  bodyPath.configurable_options[0].values[j].value_index;
                arr.push(id);
                arr.push(Item);
                type_arr.push(arr);
              }
              const size_arr = [];
              if (bodyPath.configurable_options[1] !== undefined) {
                for (
                  let j = 0;
                  j <= bodyPath.configurable_options[1].values.length - 1;
                  j++
                ) {
                  const arr = [];
                  const Item = bodyPath.configurable_options[1].values[j].label;
                  const id =
                    bodyPath.configurable_options[1].values[j].value_index;
                  arr.push(id);
                  arr.push(Item);
                  size_arr.push(arr);
                }
              }
              const color_arr = [];
              if (bodyPath.configurable_options[2] !== undefined) {
                for (
                  let j = 0;
                  j <= bodyPath.configurable_options[2].values.length - 1;
                  j++
                ) {
                  const arr = [];
                  const Item = bodyPath.configurable_options[2].values[j].label;
                  const id = bodyPath.configurable_options[2].values[j].label;
                  arr.push(id);
                  arr.push(Item);
                  color_arr.push(arr);
                }
              }
              const img_arr = [];
              for (let i = 0; i <= bodyPath.media_gallery.length - 1; i++) {
                for (
                  let j = 0;
                  j <= bodyPath.media_gallery[i].variant_ids.length - 1;
                  j++
                ) {
                  const arr = [];
                  const Item = bodyPath.media_gallery[i].image;
                  const id = bodyPath.media_gallery[i].variant_ids[j];
                  arr.push(id);
                  arr.push(Item);
                  img_arr.push(arr);
                }
              }
              let variants_arr = [];
              if (bodyPath.configurable_options.length > 1) {
                if (title.indexOf("Shoes") !== -1) {
                  for (const item of bodyPath.configurable_children) {
                    const itemVariant = {
                      sku: item.sku,
                      option1: OptionSix(item.option1, type_arr),
                      option2: OptionSix(item.option2, size_arr),
                      option3: OptionSix(item.option3, color_arr),
                      price: item.price - 1,
                      origin_price: true,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants_arr.push(itemVariant);
                  }
                  // console.log(variants_arr);
                  let listCate = ["CAMPING", "SHOES"];
                  tit = title + " " + makeid(10);
                  product = {};
                  ggcate = filterCategory(tit);
                  product["domain"] = "outdoorpod.shop";
                  product["title"] = title + " " + makeid(10);
                  product["categories"] = listCate;
                  product["google_category"] = ggcate;
                  product["gender"] = "All";
                  product["vender"] = "outdoorpod_sixteenthworld";
                  product["vender_url"] = path;
                  product["description"] = description;
                  product["images"] = images_arr;
                  product["variants"] = variants_arr;
                  product["designed"] = -1;
                  product["trending"] = trending === true ? 1 : 0;
                  product["feedback"] = null;
                  product["tags"] = tags;
                  product["rank"] = null;
                  product["vender_id"] = path;
                  product["specifics"] = null;
                  product["option1_name"] = option1_name;
                  product["option2_name"] = option2_name;
                  product["option3_name"] = option3_name;
                  product["option1_picture"] = 0;
                  product["delivery_date_min"] = 5;
                  product["delivery_date_max"] = 20;
                  product["shipping_service_name"] = "Economy Shipping";
                  product["location"] = "USA";
                  // console.log(JSON.stringify(product));
                  send(product, "outdoorpod_sixteenthworld");
                } else {
                  for (const item of bodyPath.configurable_children) {
                    const itemVariant = {
                      sku: item.sku,
                      option1: OptionSix(item.option1, type_arr),
                      option2: OptionSix(item.option2, size_arr),
                      option3: OptionSix(item.option3, color_arr),
                      var_images: CheckImgSix(item.id, img_arr),
                      price: item.price - 1,
                      origin_price: true,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants_arr.push(itemVariant);
                  }
                  // console.log(variants_arr);
                  let listCate = ["CAMPING", "T-SHIRTS"];
                  tit = title + " " + makeid(10);
                  product = {};
                  ggcate = filterCategory(tit);
                  product["domain"] = "outdoorpod.shop";
                  product["title"] = title + " " + makeid(10);
                  product["categories"] = listCate;
                  product["google_category"] = ggcate;
                  product["gender"] = "All";
                  product["vender"] = "outdoorpod_sixteenthworld";
                  product["vender_url"] = path;
                  product["description"] = description;
                  product["images"] = images_arr;
                  product["variants"] = variants_arr;
                  product["designed"] = -1;
                  product["trending"] = trending === true ? 1 : 0;
                  product["feedback"] = null;
                  product["tags"] = tags;
                  product["rank"] = null;
                  product["vender_id"] = path;
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
                  send(product, "outdoorpod_sixteenthworld");
                }
              } else {
                if (title.indexOf("Shoes") !== -1) {
                  for (const item of bodyPath.configurable_children) {
                    const itemVariant = {
                      sku: item.sku,
                      option1: OptionSix(item.option1, type_arr),
                      option2: OptionSix(item.option2, size_arr),
                      option3: OptionSix(item.option3, color_arr),
                      price: item.price - 1,
                      origin_price: true,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants_arr.push(itemVariant);
                  }
                  // console.log(variants_arr);
                  let listCate = ["CAMPING", "SHOES"];
                  tit = title + " " + makeid(10);
                  product = {};
                  ggcate = filterCategory(tit);
                  product["domain"] = "outdoorpod.shop";
                  product["title"] = title + " " + makeid(10);
                  product["categories"] = listCate;
                  product["google_category"] = ggcate;
                  product["gender"] = "All";
                  product["vender"] = "outdoorpod_sixteenthworld";
                  product["vender_url"] = path;
                  product["description"] = description;
                  product["images"] = images_arr;
                  product["variants"] = variants_arr;
                  product["designed"] = -1;
                  product["trending"] = trending === true ? 1 : 0;
                  product["feedback"] = null;
                  product["tags"] = tags;
                  product["rank"] = null;
                  product["vender_id"] = path;
                  product["specifics"] = null;
                  product["option1_name"] = option1_name;
                  product["option2_name"] = option2_name;
                  product["option3_name"] = option3_name;
                  product["option1_picture"] = 0;
                  product["delivery_date_min"] = 5;
                  product["delivery_date_max"] = 20;
                  product["shipping_service_name"] = "Economy Shipping";
                  product["location"] = "USA";
                  // console.log(JSON.stringify(product));
                  send(product, "outdoorpod_sixteenthworld");
                } else {
                  for (const item of bodyPath.configurable_children) {
                    const itemVariant = {
                      sku: item.sku,
                      option1: OptionSix(item.option1, type_arr),
                      option2: OptionSix(item.option2, size_arr),
                      option3: OptionSix(item.option3, color_arr),
                      price: item.price - 1,
                      origin_price: true,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants_arr.push(itemVariant);
                  }
                  // console.log(variants_arr);
                  let listCate = ["CAMPING", "TUMBLERS"];
                  tit = title + " " + makeid(10);
                  product = {};
                  ggcate = filterCategory(tit);
                  product["domain"] = "outdoorpod.shop";
                  product["title"] = title + " " + makeid(10);
                  product["categories"] = listCate;
                  product["google_category"] = ggcate;
                  product["gender"] = "All";
                  product["vender"] = "outdoorpod_sixteenthworld";
                  product["vender_url"] = path;
                  product["description"] = description;
                  product["images"] = images_arr;
                  product["variants"] = variants_arr;
                  product["designed"] = -1;
                  product["trending"] = trending === true ? 1 : 0;
                  product["feedback"] = null;
                  product["tags"] = tags;
                  product["rank"] = null;
                  product["vender_id"] = path;
                  product["specifics"] = null;
                  product["option1_name"] = option1_name;
                  product["option2_name"] = option2_name;
                  product["option3_name"] = option3_name;
                  product["option1_picture"] = 0;
                  product["delivery_date_min"] = 5;
                  product["delivery_date_max"] = 20;
                  product["shipping_service_name"] = "Economy Shipping";
                  product["location"] = "USA";
                  // console.log(JSON.stringify(product));
                  send(product, "outdoorpod_sixteenthworld");
                }
              }

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
function OptionSix(id, arr) {
  if (id !== 0) {
    for (const item of arr) {
      if (id === item[0]) {
        return item[1];
      }
    }
  } else {
    return "";
  }
}
function CheckImgSix(id, arrItem) {
  const arr = [];
  for (const item of arrItem) {
    if (id === item[0]) {
      arr.push(item[1]);
      return arr;
    }
  }
  return arr;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
