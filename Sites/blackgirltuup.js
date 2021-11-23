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
  console.log(item);
  $.ajax({
    url: "https://api.winterluckpod.com/admin/product/create-tool",
    type: "post",
    dataType: "text",
    data: {
      item: JSON.stringify(item),
    },

    vender: vender,
    success: function (data) {
      console.log(data);
      // console.log(this.next);
      //window.close();
    },
    error: function (request, error) {
      console.log(data);

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
      window.close();
    },
  });
}

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
if (window.location.href.indexOf("https://xx.com") > -1) {
  console.log("deo co j");
}
// https://meowpinky
else if (
  window.location.href.indexOf("blackgirlsshop.com") > -1 ||
  window.location.href.indexOf("https://www.blackgirlsshop.com") > -1
) {
  console.log("sport");
  if (
    window.location.href.indexOf("https://blackgirlsshop.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/product/") > -1) {
    $(window).ready(function () {
      (async () => {
        await timeout(5000);
        $("img").each((key, img) => {
          let attr = $(img).attr("data-lazy-src");
          if (typeof attr !== typeof undefined && attr !== false) {
            $(img).attr("src", $(img).attr("data-lazy-src"));
          }
        });
        //data = JSON.parse($(".variations_form ").attr('data-product_variations'));
        //console.log(JSON.stringify(data));
        description = $("#tab-description").html();
        description = description.replaceAll(
          "support@blackgirlsshop.com",
          "support@blackgirlsshop.com"
        );
        //console.log(description)

        //product_type = (data.type != '' ? data.type : data.tags[0]);
        let tags = "";
        try {
          tagScript = $("#pys-js-extra").text();
          matchTag = tagScript.match(/var pysOptions = (.*?);/);
          jsonTag = JSON.parse(matchTag[1]);
          tags =
            jsonTag?.staticEvents?.facebook?.ViewContent[0]?.params?.tags || "";
        } catch (error) {
          tags = "";
        }

        images = [];

        $(".woocommerce-product-gallery__image").each(function (
          image_key,
          image
        ) {
          images[image_key] = $(image).find("a").attr("href");
        });
        console.log(images);
        variants = [];

        //console.log(images);

        option1_name = "Style";
        option2_name = "Size";
        option1_picture = 0;

        listCate = [];

        listCate.push("SHOES");

        //console.log(listCate);

        const dataVariants = {
          "all-over-print": {
            //option1: ['T-Shirt', 'Hoodie', 'Tank', 'Sweatshirt', 'Kid', 'Hoodied Dress'],
            option1: {
              "T-Shirt": {
                price: 26.95,
              },
              Hoodie: {
                price: 45.95,
              },
              Sweatshirt: {
                price: 38.95,
              },
              "Hoodied Dress": {
                price: 52.95,
              },
              Zip: {
                price: 49.95,
              },
              Tank: {
                price: 28.95,
              },
              Kid: {
                price: 26.95,
              },
            },
            option2: {
              x: {
                subcharge: 0,
              },
              xl: {
                subcharge: 1,
              },
            },
          },
          Shoes: {
            option1: {
              "Men's": {
                price: 75.99,
              },
              "WoMen's": {
                price: 75.95,
              },
            },
            option2: {
              "US5 | EU35 | UK3": {
                subcharge: 0,
              },
              "US6 | EU36 | UK4": {
                subcharge: 0,
              },
              "US7 | EU37 | UK5": {
                subcharge: 0,
              },
              "US8 | EU38 | UK6": {
                subcharge: 0,
              },
              "US9 | EU39 | UK7": {
                subcharge: 0,
              },
              "US10 | EU40 | UK8": {
                subcharge: 0,
              },
              "US11 | EU41 | UK9": {
                subcharge: 0,
              },
              "US12 | EU42 | UK10": {
                subcharge: 0,
              },
            },
          },
          Quilt: {
            option1: {
              "Crystal Clear": {
                price: 65.95,
              },
            },
            option2: {
              'Twin (60"x70")': {
                subcharge: 0,
              },
              'Queen (70"x80")': {
                subcharge: 10,
              },
              'King (90"x102")': {
                subcharge: 20,
              },
            },
          },
          Blanket: {
            option1: {
              "Crystal Clear": {
                price: 57.95,
              },
            },
            option2: {
              'Youth (51"x59")': {
                subcharge: 0,
              },
              'Adult (59"x79")': {
                subcharge: 10,
              },
            },
          },
          "Bedding Set": {
            option1: {
              "Crystal Clear": {
                price: 67.95,
              },
            },
            option2: {
              "US Califonia King": {
                subcharge: 20,
              },
              "US Twin": {
                subcharge: 0,
              },
              "US Queen": {
                subcharge: 10,
              },
              "US King": {
                subcharge: 20,
              },
              "US Full": {
                subcharge: 5,
              },
            },
          },
          "Home Doormat": {
            option1: {
              "Crystal Clear": {
                price: 30.95,
              },
            },
            option2: {
              "One Size (40 x 60 cm)": {
                subcharge: 0,
              },
            },
          },
          "Cushion Cover": {
            option1: {
              "Crystal Clear": {
                price: 24.95,
              },
            },
            option2: {
              'One Size (17"x17")': {
                subcharge: 0,
              },
            },
          },
        };
        Titlestring = $(".product_title").text();
        // if (Titlestring.indexOf("Bedding Set") != -1 || Titlestring.indexOf("Quilt Bed Set") != -1) {
        //   console.log("Hàng Bedding Set");
        //   cateOption = dataVariants["Bedding Set"];
        // } else if (Titlestring.indexOf("Quilt") != -1 || Titlestring.indexOf("Quilt Blanket") != -1) {
        //   console.log("Hàng Quilt");
        //   cateOption = dataVariants["Quilt"];
        // } else if (Titlestring.indexOf("Blanket") != -1) {
        //   console.log("Hàng Blanket");
        //   cateOption = dataVariants["Blanket"];
        // } else if (Titlestring.indexOf("Doormat") != -1) {
        //   console.log("Hàng Home Doormat");
        //   cateOption = dataVariants["Home Doormat"];
        // } else if (Titlestring.indexOf("Cushion Cover") != -1) {
        //   console.log("Hàng Cushion Cover");
        //   cateOption = dataVariants["Cushion Cover"];
        // } else {
        //   console.log("Hàng None");
        //   window.close();
        //   Return;
        // }
        //console.log(cateOption)
        cateOption = dataVariants["Shoes"];
        const testVariants = [];

        for (let keyOp1 in cateOption.option1) {
          const price = cateOption.option1[keyOp1].price;

          for (let keyOp2 in cateOption.option2) {
            const subcharge = cateOption.option2[keyOp2].subcharge;
            variant = {
              option1: keyOp1,
              option2: keyOp2,
              origin_price: true,
              price: price + subcharge,
              cost: 0,
              shipping_cost: 0,
              quantity: 9999,
            };

            variants.push(variant);

            if (keyOp1 == "Hoodied Dress" && keyOp2 == "3XL") {
              break;
            }
            if (keyOp1 == "Tank" && keyOp2 == "3XL") {
              break;
            }
            if (keyOp1 == "Kid" && keyOp2 == "3XL") {
              break;
            }
          }
        }

        console.log(variants);
        ggcate = "Apparel & Accessories > Shoes";
        domain = "zonesofblack.net";
        //console.log(variants);
        product = {};
        product["store"] = true;
        product["domain"] = domain;
        product["customdesign"] = 0;
        product["title"] = Titlestring;
        product["categories"] = listCate;
        product["google_category"] = ggcate;
        product["gender"] = "All";
        product["vender"] = "blackgirlsshop";
        product["vender_url"] = window.location.href;
        product["description"] = description != undefined ? description : null;
        product["images"] = images;
        product["variants"] = variants;
        product["designed"] = -1;
        product["trending"] = trending === true ? 1 : 0;
        product["feedback"] = null;
        product["tags"] = tags;
        product["rank"] = null;
        product["delivery_date_min"] = 5;
        product["delivery_date_max"] = 15;
        product["option1_name"] = option1_name;
        product["option2_name"] = option2_name;
        product["option1_picture"] = 0;
        product["shipping_service_name"] = "Economy Shipping";
        product["location"] = "USA";
        product["vender_id"] = $(".variations_form ").attr("data-product_id");
        product["specifics"] = null;
        console.log(JSON.stringify(product));
        send(product, "blackgirlsshop");
      })();
    });
  } else if (window.location.href.indexOf("/product-category/") > -1) {
    console.log("get product link");
    // page = $(".page-numbers .current")[0].textContent;
    // console.log(page);

    $(window).ready(function () {
      $(".image-fade_in_back").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".image-fade_in_back").length - 1) {
            setTimeout(function () {
              page = $(".page-numbers .current")[0].textContent;
              console.log(page);
              if (page == "1") {
                var url_string = window.location.href;
                var url = url_string + "/page/2";
                window.location.href = url;
              } else {
                next_page = parseInt(page) + 1;
                var url_string = window.location.href;
                var url = url_string.replace(
                  "/page/" + page,
                  "/page/" + next_page
                );
                window.location.href = url;
              }
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          url = $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

function timeout(ms = 10000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
