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
  window.location.href.indexOf("https://www.ghibli.store.com") > -1 ||
  window.location.href.indexOf("https://ghibli.store") > -1
) {
  if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          const urlRequest = `${url_string}/page/${page}/`;
          const rq = await fetch(urlRequest);
          const body = await rq.text();
          const productItem = $(body).find(
            ".shop-content-area .product-element-top a"
          );
          $(productItem).each(function (_, item) {
            urlProducts.push($(item).attr("href"));
          });
          // console.log(urlProducts);
          const urlsUnique = [...new Set(urlProducts)];
          // console.log(data);

          for (const path of urlsUnique) {
            try {
              // console.log(path);
              const rqPath = await fetch(path);
              const bodyPath = await rqPath.text();
              const productId = $(bodyPath)
                .find(".variations_form")
                .attr("data-product_id");

              let linkapi1 = `https://ghibli.store/?wc-ajax=get_variations&product_id=${productId}`;
              // console.log(linkapi1);
              const rqJson = await fetch(linkapi1);
              const dataJson = await rqJson.json();
              // console.log(dataJson);
              if (dataJson === false) {
                let title = $(bodyPath).find(".product_title").text();
                // console.log(title);
                let idItem = $(bodyPath)
                  .find(".single_add_to_cart_button")
                  .attr("value");
                // console.log(productId);
                let linkap2 = `https://gapi.beeketing.com/v1/product/products.json?ref_id=${idItem}&api_key=8ca40f277ba2a95ffbde04e366fde801`;
                const rqJsonItem = await fetch(linkap2);
                const dataJsonItem = await rqJsonItem.json();
                // console.log(dataJsonItem[0]);

                let imagess = [];
                for (const item of dataJsonItem[0].images) {
                  imagess.push(item.src);
                }

                let tags = dataJsonItem[0].tags;
                let description = dataJsonItem[0].description;
                let variants_arr = [];
                for (const item of dataJsonItem[0].variants) {
                  const itemVariant = {
                    option1: item.option1,
                    var_images: CheckImagesTeeholic(item.image_url),
                    price: item.price,
                    cost: item.price - 2,
                    origin_price: true,
                    shipping_cost: 0,
                    quantity: 9999,
                  };
                  variants_arr.push(itemVariant);
                }
                console.log(variants_arr);
                let listCate = ["OTHERS"];
                tit = title + " " + makeid(10);
                product = {};
                ggcate = filterCategory(tit);
                product["domain"] = "customray.com";
                product["title"] = title + " " + makeid(10);
                product["categories"] = listCate;
                product["google_category"] = ggcate;
                product["gender"] = "All";
                product["vender"] = "ghibli";
                product["vender_url"] = path;
                product["description"] = description;
                product["images"] = imagess;
                product["variants"] = variants_arr;
                product["designed"] = -1;
                product["trending"] = trending === true ? 1 : 0;
                product["feedback"] = null;
                product["tags"] = "";
                product["rank"] = null;
                product["vender_id"] =
                  productId !== undefined ? productId : idItem;
                product["specifics"] = null;
                product["option1_picture"] = 0;
                product["delivery_date_min"] = 5;
                product["delivery_date_max"] = 20;
                product["shipping_service_name"] = "Economy Shipping";
                product["location"] = "USA";
                // console.log(JSON.stringify(product));
                // send(product, "ghibli");
              } else {
                let title = $(bodyPath).find(".product_title").text();
                let description = $(bodyPath)
                  .find(".woocommerce-product-details__short-description")
                  .html();
                const option1_name = "Colors";
                const option2_name = "Size";
                let variants_arr = [];
                for (const item of dataJson) {
                  const itemVariant = {
                    option1: item.attributes.attribute_color,
                    option2: item.attributes.attribute_size,
                    var_images: CheckImagesTeeholic(item.image.src),
                    price: item.display_price,
                    cost: item.display_price - 2,
                    origin_price: true,
                    shipping_cost: 0,
                    quantity: 9999,
                  };
                  variants_arr.push(itemVariant);
                }
                console.log(variants_arr);
                let images = variants_arr[0].var_images;
                let listCate = ["OTHERS"];
                tit = title + " " + makeid(10);
                product = {};
                ggcate = filterCategory(tit);
                product["domain"] = "customray.com";
                product["title"] = title + " " + makeid(10);
                product["categories"] = listCate;
                product["google_category"] = ggcate;
                product["gender"] = "All";
                product["vender"] = "ghibli";
                product["vender_url"] = path;
                product["description"] = description;
                product["images"] = images;
                product["variants"] = variants_arr;
                product["designed"] = -1;
                product["trending"] = trending === true ? 1 : 0;
                product["feedback"] = null;
                product["tags"] = "";
                product["rank"] = null;
                product["vender_id"] = productId;
                product["specifics"] = null;
                product["option1_name"] = option1_name;
                product["option2_name"] = option2_name;
                product["option1_picture"] = 1;
                product["delivery_date_min"] = 5;
                product["delivery_date_max"] = 20;
                product["shipping_service_name"] = "Economy Shipping";
                product["location"] = "USA";
                // console.log(JSON.stringify(product));
                // send(product, "ghibli");
                // console.log(title);

                // console.log(variants_arr);
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

        // getPage(++page);
      }
      getPage();
    });
  }
}
function CheckImagesTeeholic(img) {
  let var_img = [];
  var_img.push(img);
  return var_img;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
