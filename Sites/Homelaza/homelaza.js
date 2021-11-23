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
  window.location.href.indexOf("https://www.homelaza.com") > -1 ||
  window.location.href.indexOf("https://homelaza.com") > -1
) {
  if (window.location.href.indexOf("/product-tag/") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      let page_arr = [];

      console.log(page_arr);
      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          // console.log(page_arr);
          if (page < 6) {
            const urlRequest = `${url_string}page/${page}/`;
            // console.log(urlRequest);
            const rq = await fetch(urlRequest);
            const body = await rq.text();

            const ItemHref = $(body).find(
              ".category-page-row .products .image-none a"
            );
            $(ItemHref).each(function (_, item) {
              urlProducts.push($(item).attr("href"));
            });

            const urlsUnique = [...new Set(urlProducts)];
            // console.log(data);

            for (const path of urlsUnique) {
              try {
                // console.log(path);
                const rqPath = await fetch(path);
                const bodyPath = await rqPath.text();
                const variants = $(bodyPath)
                  .find("form.cart")
                  .attr("data-product_variations");
                const dataVariants = JSON.parse(variants);
                // console.log(dataVariants);
                let title = $(bodyPath)
                  .find(".product-info h1.product-title")
                  .text();
                // console.log(title);
                let tags = "Hunting,Fishing,Camping";
                let description = $(bodyPath).find("#tab-description").html();
                let images_arr = [];
                const itemImg = $(bodyPath).find(
                  ".product-container .product-thumbnails img"
                );
                let option1_name = "Styles";
                let option2_name = "Dimension";
                let option3_name = "";
                $(itemImg).each(function (_, item) {
                  images_arr.push($(item).attr("src"));
                });
                let variants_arr = [];
                for (const item of dataVariants) {
                  const itemVariant = {
                    sku: item.sku,
                    option1: OptionHo(item.attributes.attribute_pa_styles),
                    option2: item.attributes.attribute_pa_size.toUpperCase(),
                    var_images: CheckImgHo(item.image.full_src),
                    price: Number(item.display_price) - 1,
                    origin_price: true,
                    shipping_cost: 0,
                    quantity: 9999,
                  };
                  variants_arr.push(itemVariant);
                }
                // console.log(variants_arr);

                let listCate = ["HUNTING"];
                tit = title + " " + makeid(10);
                product = {};
                ggcate = filterCategory(tit);
                product["domain"] = "outdoorpod.shop";
                product["title"] = title + " " + makeid(10);
                product["categories"] = listCate;
                product["google_category"] = ggcate;
                product["gender"] = "All";
                product["vender"] = "outdoorpod_homelaza";
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
                send(product, "outdoorpod_homelaza");
                // break;
              } catch (e) {
                console.error(e);
              } finally {
                await timeOut(800);
              }
            }
          } else {
            return;
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
function OptionHo(item) {
  const Item = item.charAt(0).toUpperCase() + item.slice(1);
  return Item;
}
function CheckImgHo(img) {
  const arr = [];
  arr.push(img);
  return arr;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
