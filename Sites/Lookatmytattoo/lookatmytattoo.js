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
  window.location.href.indexOf("https://www.lookatmytattoo.com") > -1 ||
  window.location.href.indexOf("https://lookatmytattoo.com") > -1
) {
  if (window.location.href.indexOf("/product-category/") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          const urlRequest = `${url_string}page/${page}`;
          // console.log(urlRequest);
          const rq = await fetch(urlRequest);
          const body = await rq.text();
          const productItem = $(body).find(".columns-4 .product a");
          // console.log(productItem);
          $(productItem).each(function (_, item) {
            urlProducts.push($(item).attr("href"));
          });
          // console.log(urlProducts);
          const urlsUnique = [...new Set(urlProducts)];

          for (const path of urlsUnique) {
            try {
              // console.log(path);
              const rqPath = await fetch(path);
              const bodyPath = await rqPath.text();
              const title = $(bodyPath).find(" h1.entry-title ").text();
              const description = $(bodyPath).find("#tab-description").html();
              let variants_arr = [];
              let option1_name = "Dimension";
              const images_arr = [];
              let images = $(bodyPath).find(
                ".product-main-content .yith_magnifier_thumbnail img"
              );
              $(images).each(function (_, item) {
                const Item = $(item).attr("src");
                const ItemN = Item.replace("160%2C160", "800%2C800");
                images_arr.push(ItemN);
              });
              const dataVariant = $(bodyPath)
                .find("form.cart")
                .attr("data-product_variations");
              const dataVariants = JSON.parse(dataVariant);
              // console.log(dataVariants);
              const imagesThub_arr = [];
              imagesThub_arr.push(dataVariants[0].image.full_src);
              const size_arr = [];
              let size = $(bodyPath).find("#size option");
              $(size).each(function (_, item) {
                if ($(item).attr("value") !== "") {
                  size_arr.push($(item).attr("value"));
                }
              });
              for (const item of dataVariants) {
                for (const size of size_arr) {
                  const itemVariant = {
                    option1: size,
                    price: item.display_price - 2,
                    origin_price: true,
                    shipping_cost: 0,
                    quantity: 9999,
                  };
                  variants_arr.push(itemVariant);
                }
              }

              // console.log(variants_arr);
              let listCate = ["T-SHIRTS"];
              tit = title + " " + makeid(10);
              product = {};
              ggcate = filterCategory(tit);
              product["domain"] = "customray.com";
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = "lookatmytattoo";
              product["vender_url"] = path;
              product["description"] = description;
              product["images"] =
                images_arr.length > 1 ? images_arr : imagesThub_arr;
              product["variants"] = variants_arr;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = "T-Shirts";
              product["rank"] = null;
              product["vender_id"] = path;
              product["specifics"] = null;
              product["option1_name"] = option1_name;
              product["option1_picture"] = 0;
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              // console.log(JSON.stringify(product));
              send(product, "lookatmytattoo");

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

function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
