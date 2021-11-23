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
  window.location.href.indexOf("https://www.amazinghoodie.com") > -1 ||
  window.location.href.indexOf("https://amazinghoodie.com") > -1
) {
  if (window.location.href.indexOf("/shop") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      let page_arr = [];

      console.log(page_arr);
      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          // console.log(page_arr);
          if (page_arr[0] !== null) {
            const urlRequest = `https://amazinghoodie.com/api/product/v3/products/search?startId=${page_arr[0]}&limit=12`;
            // console.log(urlRequest);
            const rq = await fetch(urlRequest);
            const body = await rq.json();
            // console.log(body);
            let nextPage = body.data.next;
            // console.log(nextPage);
            page_arr.push(nextPage);
            if (page_arr.length === 2) {
              page_arr.shift();
            }
            // console.log(page_arr[0]);
            for (const path of body.data.products) {
              const item = `https://amazinghoodie.com/${path.slug}`;
              urlProducts.push(item);
            }
            // console.log(urlProducts);
            const urlsUnique = [...new Set(urlProducts)];
            // console.log(data);

            for (const path of urlsUnique) {
              try {
                // console.log(path);
                const rqPath = await fetch(path);
                const bodyPath = await rqPath.text();
                const variants = bodyPath.match(/__NEXT_DATA__ =(.*?)};/);
                const variantJson = JSON.parse(variants[1] + "}");
                let data = variantJson.props.pageProps.product;
                let dataVar = JSON.stringify(data);
                Json = dataVar.replace(/_id/gi, "id");
                const dataJson = JSON.parse(Json);
                // console.log(dataJson);
                let title = dataJson.title;
                // console.log(title);
                let tags =
                  dataJson.tags !== undefined ? dataJson.tags.toString() : "";
                let description = dataJson.description;
                let images_arr = [];
                images_arr.push(dataJson.preview.src);
                // console.log(images_arr);
                let option1_name = "";
                let option2_name = "";
                let variants_arr = [];
                let id = dataJson.id;
                const rqVar = await fetch(
                  `https://amazinghoodie.com/api/product/products/${id}/options`
                );
                const dataVariant = await rqVar.json();
                // console.log(dataVariant.data.variants);
                if (dataVariant.data.variants.length > 50) {
                  option1_name = "Legging Size";
                  option2_name = "Tank Size";
                  for (const item of dataVariant.data.variants) {
                    const itemVariant = {
                      sku: item.sku,
                      option1: CheckOptionAmNext(item.title),
                      option2: CheckOptionAmPre(item.title),
                      price: item.retail_price - 2,
                      origin_price: true,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants_arr.push(itemVariant);
                  }
                  let listCate = ["T-SHIRTS"];
                  tit = title + " " + makeid(10);
                  product = {};
                  ggcate = filterCategory(tit);
                  product["domain"] = "beeareworld.com";
                  product["title"] = title + " " + makeid(10);
                  product["categories"] = listCate;
                  product["google_category"] = ggcate;
                  product["gender"] = "All";
                  product["vender"] = "amazinghoodie";
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
                  product["option1_picture"] = 0;
                  product["delivery_date_min"] = 5;
                  product["delivery_date_max"] = 20;
                  product["shipping_service_name"] = "Economy Shipping";
                  product["location"] = "USA";
                  // console.log(JSON.stringify(product));
                  send(product, "amazinghoodie");
                } else if (
                  dataVariant.data.variants.length < 50 &&
                  dataVariant.data.variants.length > 10
                ) {
                  option1_name = "Styles";
                  option2_name = "Dimension";
                  for (const item of dataVariant.data.variants) {
                    const itemVariant = {
                      sku: item.sku,
                      option1: CheckOptionAmNext(item.title),
                      option2: CheckOptionAmPre(item.title),
                      price: item.retail_price - 2,
                      origin_price: true,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants_arr.push(itemVariant);
                  }
                  let listCate = ["OTHERS"];
                  tit = title + " " + makeid(10);
                  product = {};
                  ggcate = filterCategory(tit);
                  product["domain"] = "beeareworld.com";
                  product["title"] = title + " " + makeid(10);
                  product["categories"] = listCate;
                  product["google_category"] = ggcate;
                  product["gender"] = "All";
                  product["vender"] = "amazinghoodie";
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
                  product["option1_picture"] = 0;
                  product["delivery_date_min"] = 5;
                  product["delivery_date_max"] = 20;
                  product["shipping_service_name"] = "Economy Shipping";
                  product["location"] = "USA";
                  // console.log(JSON.stringify(product));
                  send(product, "amazinghoodie");
                } else if (
                  dataVariant.data.variants.length < 10 &&
                  dataVariant.data.variants.length > 2
                ) {
                  option1_name = "Dimension";
                  for (const item of dataVariant.data.variants) {
                    const itemVariant = {
                      sku: item.sku,
                      option1: item.title,
                      price: item.retail_price - 2,
                      origin_price: true,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants_arr.push(itemVariant);
                  }
                  let listCate = ["BEDDING SET & BLANKET"];
                  tit = title + " " + makeid(10);
                  product = {};
                  ggcate = filterCategory(tit);
                  product["domain"] = "beeareworld.com";
                  product["title"] = title + " " + makeid(10);
                  product["categories"] = listCate;
                  product["google_category"] = ggcate;
                  product["gender"] = "All";
                  product["vender"] = "amazinghoodie";
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
                  product["option1_picture"] = 0;
                  product["delivery_date_min"] = 5;
                  product["delivery_date_max"] = 20;
                  product["shipping_service_name"] = "Economy Shipping";
                  product["location"] = "USA";
                  // console.log(JSON.stringify(product));
                  send(product, "amazinghoodie");
                } else {
                  option1_name = "Styles";
                  option2_name = "Dimension";
                  for (const item of dataVariant.data.variants) {
                    const itemVariant = {
                      sku: item.sku,
                      option1: CheckOptionAmNext(item.title),
                      option2: CheckOptionAmPre(item.title),
                      price: item.retail_price - 2,
                      origin_price: true,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants_arr.push(itemVariant);
                  }
                  let listCate = ["BEDDING SET & BLANKET"];
                  tit = title + " " + makeid(10);
                  product = {};
                  ggcate = filterCategory(tit);
                  product["domain"] = "beeareworld.com";
                  product["title"] = title + " " + makeid(10);
                  product["categories"] = listCate;
                  product["google_category"] = ggcate;
                  product["gender"] = "All";
                  product["vender"] = "amazinghoodie";
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
                  product["option1_picture"] = 0;
                  product["delivery_date_min"] = 5;
                  product["delivery_date_max"] = 20;
                  product["shipping_service_name"] = "Economy Shipping";
                  product["location"] = "USA";
                  // console.log(JSON.stringify(product));
                  send(product, "amazinghoodie");
                }
                // console.log(variants_arr);
              } catch (e) {
                console.error(e);
              } finally {
                await timeOut(800);
              }
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
function CheckOptionAmNext(item) {
  const Item = item.slice(0, item.indexOf("/") - 1).trim();
  return Item;
}
function CheckOptionAmPre(item) {
  const Item = item.slice(item.indexOf("/") + 1, item.length).trim();
  return Item;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
