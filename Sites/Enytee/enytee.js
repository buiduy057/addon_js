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
  window.location.href.indexOf("https://www.enytee.com") > -1 ||
  window.location.href.indexOf("https://enytee.com") > -1
) {
  if (window.location.href.indexOf("/shop/") > -1) {
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
            ".shop-container .image-fade_in_back a"
          );
          $(productItem).each(function (_, item) {
            urlProducts.push($(item).attr("href"));
          });
          // console.log(urlProducts);
          const urlsUnique = [...new Set(urlProducts)];
          // console.log(data);

          for (const path of urlsUnique) {
            try {
              //     // console.log(path);
              const rqPath = await fetch(path);
              const bodyPath = await rqPath.text();
              const title = $(bodyPath)
                .find(".product-info  h1.product-title ")
                .text();
              const description = $(bodyPath).find("#tab-description").html();
              let imageThub = [];
              let imageitem = $(bodyPath).find(
                ".shop-container .product-thumbnails img"
              );
              $(imageitem).each(function (_, item) {
                imageThub.push($(item).attr("src"));
              });
              const dataPrice = $(bodyPath)
                .find("form.cart .wcpa_form_outer")
                .attr("data-product");
              const dataPriceJson = JSON.parse(dataPrice);
              const price = dataPriceJson.wc_product_price;
              const optionName = [];
              const itemOption = $(bodyPath).find(
                ".wcpa_form_outer .wcpa_row .wcpa_form_item > label"
              );

              $(itemOption).each(function (_, item) {
                const Item = $(item).text();
                optionName.push(Item);
              });
              console.log(optionName);

              // const var01 = [];
              // const var02 = [];
              // const var03 = [];
              // const var04 = [];
              // const itemvar01 = $(bodyPath).find(
              //   `#wcpa-radio-group-1588165618924 .wcpa_radio label`
              // );
              // $(itemvar01).each(function (_, item) {
              //   const Item = $(item).text().trim();
              //   var01.push(Item);
              // });

              // const data_related01 = $(bodyPath)
              //   .find("#wcpa-radio-group-1588165618924")
              //   .attr("data-related");
              // const related01 = JSON.parse(data_related01);
              // console.log(related01);

              // for (const item of related01) {
              //   const itemvarText = $(bodyPath).find(`#${item} .wcpa_image`);

              //   let var02 = [];
              //   let var03 = [];
              //   $(itemvarText).each(function (_, item) {
              //     const arr = [];
              //     const Item01 = $(item).children().eq(0).attr("data-price");
              //     const ItemPrice = JSON.parse(Item01);
              //     const valuePrice = ItemPrice.value;
              //     const Item02 = $(item).find("img").attr("src");
              //     const Item03 = $(item)
              //       .find("p.wcpa_image_desc")
              //       .text()
              //       .trim();
              //     arr.push(valuePrice);
              //     arr.push(Item02);
              //     arr.push(Item03);
              //     var02.push(arr);
              //   });

              //   const data_related02 = $(bodyPath)
              //     .find(`#${item}`)
              //     .attr("data-related");
              //   const related02 = JSON.parse(data_related02);
              //   // console.log(related02);
              //   for (const color of related02) {
              //     if (color.indexOf("wcpa-color-group") !== -1) {
              //       const itemvarColor = $(bodyPath).find(
              //         `#${color} .wcpa_color`
              //       );
              //       $(itemvarColor).each(function (_, item) {
              //         const Item = $(item).text().trim();
              //         var03.push(Item);
              //       });
              //     } else {
              //     }
              //     console.log(var02);
              //     console.log(var03);
              //   }
              // }

              // // console.log(itemvar02);
              // // $(itemvar02).each(function (_, item) {
              // //   // console.log(item);
              // //   const arr = [];
              // //   const Item01 = $(item).find("input").attr("data-price");
              // //   const ItemString = JSON.stringify(Item01);
              // //   const ItemPrice = JSON.parse(ItemString);
              // //   console.log(ItemPrice);
              // //   const valuePrice = ItemPrice.value;
              // //   const Item02 = $(item).find("img").attr("src");
              // //   const Item03 = $(item).find("p.wcpa_image_desc").text().trim();
              // //   arr.push(valuePrice);
              // //   arr.push(Item02);
              // //   arr.push(Item03);
              // //   var02.push(arr);
              // // });
              // // console.log(var02);

              // // const itemvar03 = $(bodyPath).find(
              // //   `#wcpa-color-group-1588164205966 p.wcpa_color_desc`
              // // );

              // // $(itemvar03).each(function (_, item) {
              // //   const Item = $(item).text().trim();
              // //   var03.push(Item);
              // // });
              // // console.log(var03);

              // // const itemvar04 = $(bodyPath).find(
              // //   `.wcpa_type_select select option`
              // // );
              // // $(itemvar04).each(function (_, item) {
              // //   const arr = [];
              // //   const Item01 = $(item).attr("data-price");
              // //   const ItemPrice = JSON.parse(Item01);
              // //   const valuePrice = ItemPrice.value;
              // //   const Item02 = $(item).attr("value");
              // //   arr.push(valuePrice);
              // //   arr.push(Item02);
              // //   var04.push(arr);
              // // });
              // // console.log(var04);
              break;

              //     const dataJson = $(bodyPath)
              //       .find("form.cart")
              //       .attr("data-product_variations");
              //     const dataVariant = JSON.parse(dataJson);
              //     // console.log(dataVariant);
              //     let option1_name = "Dimension";
              //     let variants_arr = [];
              //     for (const item of dataVariant) {
              //       const itemVariant = {
              //         option1: item.attributes.attribute_size,
              //         price: item.display_price - 2,
              //         origin_price: true,
              //         shipping_cost: 0,
              //         quantity: 9999,
              //       };
              //       variants_arr.push(itemVariant);
              //     }
              //     // console.log(variants_arr);
              //     let listCate = ["QUILT & BLANKET"];
              //     tit = title + " " + makeid(10);
              //     product = {};
              //     ggcate = filterCategory(tit);
              //     product["domain"] = "customray.com";
              //     product["title"] = title + " " + makeid(10);
              //     product["categories"] = listCate;
              //     product["google_category"] = ggcate;
              //     product["gender"] = "All";
              //     product["vender"] = "norasportstyle";
              //     product["vender_url"] = path;
              //     product["description"] = description;
              //     product["images"] = imageThub;
              //     product["variants"] = variants_arr;
              //     product["designed"] = -1;
              //     product["trending"] = trending === true ? 1 : 0;
              //     product["feedback"] = null;
              //     product["tags"] = "";
              //     product["rank"] = null;
              //     product["vender_id"] = path;
              //     product["specifics"] = null;
              //     product["option1_name"] = option1_name;
              //     product["option1_picture"] = 0;
              //     product["delivery_date_min"] = 5;
              //     product["delivery_date_max"] = 20;
              //     product["shipping_service_name"] = "Economy Shipping";
              //     product["location"] = "USA";
              //     // console.log(JSON.stringify(product));
              //     send(product, "norasportstyle");
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

function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
