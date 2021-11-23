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
      window.close();
    },
    error: function (request, error) {
      console.log(data);

      // var url_string  = window.location.href;
      // window.location.href = url_string;
      window.close();
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
// MERCHFACTORY
else if (window.location.href.indexOf("https://merchfactory.store") > -1) {
  if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($(".variations_form ").attr("data-product_variations"));
      description = $("#tab-description")
        .html()
        .replace("<h2>Description</h2>", "")
        .replace("support@merchfactory.store", "contact@mantadrop.com");
      tags = "";
      images = [];
      variants = [];
      product_type = data.type != "" ? data.type : data.tags[0];

      content = $("head").html();
      content1 = content.split('"tags":"');
      if (content1[1] != undefined) {
        content2 = content1[1].split('"}');
        tags = content2[0].trim();
      }

      $(".woocommerce-product-gallery__image").each(function (
        image_key,
        image
      ) {
        images[image_key] = $(image).find("img").attr("src");
      });
      data.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image: variant.image.full_src,
          option1:
            variant.attributes.attribute_style != undefined
              ? variant.attributes.attribute_style
              : variant.attributes.attribute_color != undefined
              ? variant.attributes.attribute_color
              : "Crystal Clear",
          option2:
            variant.attributes.attribute_size != undefined
              ? variant.attributes.attribute_size
              : "One Size",
          origin_price: true,
          price: variant.display_price,
          cost: variant.display_price,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = $(".product_title").text();
      product["product_type"] = $(".product_cat").text();
      product["gender"] = "All";
      product["vender"] = "merchfactory";
      product["vender_url"] = window.location.href;
      product["description"] = description;
      product["images"] = images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = $(".variations_form ").attr("data-product_id");
      send(product, "merchfactory");
    });
  } else if (window.location.href.indexOf("?s=") > -1) {
    $(window).ready(function () {
      $(".products li").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".products li").length - 1) {
            setTimeout(function () {
              page = $(".page-numbers.current").text();
              next_page = parseInt(page) + 1;
              var url_string = window.location.href;
              var url = url_string.replace(
                "/page/" + page,
                "/page/" + next_page
              );
              window.location.href = url;
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

// 99Shirt
else if (
  window.location.href.indexOf("https://www.99shirt.com") > -1 ||
  window.location.href.indexOf("https://99shirt.com") > -1
) {
  if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      description = $("#tabs > div:nth-child(3)").html();
      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Sneakers";
      product["gender"] = "All";
      product["vender"] = "99shirt";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      send(product, "99shirt");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      $("#Collection .grid-view-item").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $("#Collection .grid-view-item").length - 1) {
            setTimeout(function () {
              var url_string = window.location.href;
              var page = get("page");
              next_page = parseInt(page) + 1;
              var url = url_string.replace("page=" + page, "page=" + next_page);
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = "https://99shirt.com";
          url += $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

// WEARWANTA
else if (window.location.href.indexOf("https://wearwanta.com") > -1) {
  if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      description = $("#tabs > div:nth-child(3)").html();
      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Sneakers";
      product["gender"] = "All";
      product["vender"] = "wearwanta";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      send(product, "wearwanta");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      $("#Collection .grid-view-item").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $("#Collection .grid-view-item").length - 1) {
            setTimeout(function () {
              var url_string = window.location.href;
              var page = get("page");
              next_page = parseInt(page) + 1;
              var url = url_string.replace("page=" + page, "page=" + next_page);
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = "https://wearwanta.com";
          url += $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

// uscoolprint
else if (window.location.href.indexOf("https://www.uscoolprint.com") > -1) {
  if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($(".product_form").attr("data-product"));
      description = $("#tabs > div:nth-child(3)").html();
      variants = [];
      product_type = data.type != "" ? data.type : data.tags[0];
      tags = product_type != undefined ? product_type : "";
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Sneakers";
      product["gender"] = "All";
      product["vender"] = "uscoolprint";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      send(product, "uscoolprint");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      $(".product-list .product-wrap").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".product-list .product-wrap").length - 1) {
            setTimeout(function () {
              var url_string = window.location.href;
              var page = get("page");
              next_page = parseInt(page) + 1;
              var url = url_string.replace("page=" + page, "page=" + next_page);
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = "https://uscoolprint.com";
          url += $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

// bestfunnystore
else if (window.location.href.indexOf("https://bestfunnystore.com") > -1) {
  if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      content = $("body").html();
      content1 = content.split(
        "new Shopify.OptionSelectors('productSelect', {"
      );
      content2 = content1[1].split("onVariantSelected: selectCallback,");
      content3 = content2[0].trim().replace("product: ", "").slice(0, -1);
      data = JSON.parse(content3);
      description = $("#tabs > div:nth-child(3)").html();
      variants = [];
      product_type = data.type != "" ? data.type : data.tags[0];
      tags = product_type != undefined ? product_type : "";
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      if (data.variants[0].option3 != undefined) {
        designed = 0;
        variant = {
          sku: data.variants[0].sku,
          image:
            data.variants[0].featured_image != null
              ? data.variants[0].featured_image.src
              : data.images[0],
          option1: "Crystal Clear",
          option2: "One Size",
          origin_price: true,
          price: 16.95,
          cost: 16.95,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      } else {
        designed = -1;
        data.variants.forEach(function (variant, variant_key) {
          variant = {
            sku: variant.sku,
            image:
              variant.featured_image != null
                ? variant.featured_image.src
                : data.images[0],
            option1: variant.option1,
            option2: variant.option2,
            origin_price: true,
            price: parseFloat(variant.price / 100).toFixed(2),
            cost: parseFloat(variant.price / 100).toFixed(2),
            shipping_cost: 0,
            quantity: 9999,
          };
          variants.push(variant);
        });
      }

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Sneakers";
      product["gender"] = "All";
      product["vender"] = "bestfunnystore";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = designed;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      send(product, "bestfunnystore");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      $(".main_Product_grid .item").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".main_Product_grid .item").length - 1) {
            setTimeout(function () {
              var url_string = window.location.href;
              var page = get("page");
              next_page = parseInt(page) + 1;
              var url = url_string.replace("page=" + page, "page=" + next_page);
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = "https://bestfunnystore.com";
          url += $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

// xsportgear
else if (window.location.href.indexOf("https://xsportgear.com") > -1) {
  if (window.location.href.indexOf("/product/") > -1) {
    $(window).ready(function () {
      data = $(".variations_form").attr("data-product_variations");
      description = $("#tab-description").html();
      images = [];
      variants = [];
      tags = product_type = $(".breadcrumbs a:nth-last-child(1)").text();
      tags += ", " + $(".product_title").text();
      tags = tags.toLowerCase();
      $(".woocommerce-product-gallery__image").each(function (
        image_key,
        image
      ) {
        images[image_key] = $(image).find("img").attr("src");
      });

      if ($(".variations_form").length == 0) {
        variant = {
          sku: "PP0",
          image: images[0],
          option1: "Crystal Clear",
          option2: "One Size",
          origin_price: true,
          price: $(".product-page-price .woocommerce-Price-amount")
            .first()
            .text()
            .replace("$", ""),
          cost: $(".product-page-price .woocommerce-Price-amount")
            .first()
            .text()
            .replace("$", ""),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      } else {
        if (data != "false") {
          data = JSON.parse(data);
          console.log(data);
          data.forEach(function (variant, variant_key) {
            variant = {
              sku: variant.sku,
              image: variant.image.full_src,
              option1:
                variant.attributes[Object.keys(variant.attributes)[0]] !=
                undefined
                  ? capitalize(
                      variant.attributes[Object.keys(variant.attributes)[0]]
                    )
                  : "Crystal Clear",
              option2:
                variant.attributes[Object.keys(variant.attributes)[1]] !=
                undefined
                  ? capitalize(
                      variant.attributes[Object.keys(variant.attributes)[1]]
                    )
                  : "One Size",
              origin_price: true,
              price: variant.display_price,
              cost: variant.display_price,
              shipping_cost: 0,
              quantity: 9999,
            };
            variants.push(variant);
          });
        } else {
          select1 = $("#pa_style").length > 0 ? "#pa_style" : "#pa_color";
          price =
            $(".price-on-sale ins .woocommerce-Price-amount").length > 0
              ? $(".price-on-sale ins .woocommerce-Price-amount")
                  .text()
                  .replace("$", "")
              : $(".product-page-price .woocommerce-Price-amount")
                  .first()
                  .text()
                  .replace("$", "");
          $(select1 + " option").each(function (option1_key, option1) {
            $("#pa_size option").each(function (option2_key, option2) {
              variant = {
                sku: "PP" + option1_key + option2_key,
                image:
                  option1_key % 2 == 0
                    ? images[option1_key + 1]
                    : images[option1_key - 1],
                option1: $(option1).text(),
                option2: $(option2).text(),
                origin_price: true,
                price: price,
                cost: price,
                shipping_cost: 0,
                quantity: 9999,
              };
              variants.push(variant);
            });
          });
        }
      }

      product = {};
      product["store"] = true;
      product["title"] = $(".product_title").text();
      product["product_type"] =
        product_type != undefined ? product_type : "Xsportgear";
      product["gender"] = "All";
      product["vender"] = "xsportgear";
      product["vender_url"] = window.location.href;
      product["description"] = description;
      product["images"] = images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] =
        $(".variations_form").length > 0
          ? $(".variations_form").attr("data-product_id").length
          : Math.round(Math.random() * 1000000);
      // console.log(product);
      send(product, "xsportgear");
    });

    function capitalize(s) {
      if (typeof char !== "string") {
        chars = s.split("-");
        string = "";
        chars.forEach(function (char, char_key) {
          if (typeof char !== "string") {
            string += char.charAt(0).toUpperCase() + " ";
          } else {
            string += char.charAt(0).toUpperCase() + char.slice(1) + " ";
          }
        });
        return string;
      }
    }
  } else if (window.location.href.indexOf("/product-category/") > -1) {
    $(window).ready(function () {
      $(".products > .product-small").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".products > .product-small").length - 1) {
            setTimeout(function () {
              if (window.location.href.indexOf("/page/") > -1) {
                page = $(".page-number.current").text();
                next_page = parseInt(page) + 1;
                var url_string = window.location.href;
                var url = url_string.replace(
                  "/page/" + page,
                  "/page/" + next_page
                );
              } else {
                var url_string = window.location.href;
                var url = url_string + "page/2";
              }
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

// canawan
else if (window.location.href.indexOf("https://canawan.com") > -1) {
  $(window).ready(function () {
    if ($(".page-inner-base .breadcrumbs .breadcrumb").length >= 3) product();
    else category();
  });

  function product() {
    data = JSON.parse($(".product_form").attr("data-product"));
    description = $("#tabs > div:nth-child(3)").html();
    variants = [];
    product_type = data.type != "" ? data.type : data.tags[0];
    tags = product_type != undefined ? product_type : "";
    data.tags.forEach(function (tag, tag_key) {
      if (tags != "") tags = tags + ", ";
      tags = tags + tag;
    });
    data.images.forEach(function (image, image_key) {
      data.images[image_key] = "https:" + image;
    });
    data.variants.forEach(function (variant, variant_key) {
      variant = {
        sku: variant.sku,
        image:
          variant.featured_image != null
            ? variant.featured_image.src
            : data.images[0],
        option1: variant.option1,
        option2: variant.option2,
        origin_price: true,
        price: parseFloat(variant.price / 100).toFixed(2),
        cost: parseFloat(variant.price / 100).toFixed(2),
        shipping_cost: 0,
        quantity: 9999,
      };
      variants.push(variant);
    });

    product = {};
    product["store"] = true;
    product["title"] = data.title;
    product["product_type"] =
      product_type != undefined ? product_type : "Sneakers";
    product["gender"] = "All";
    product["vender"] = "canawan";
    product["vender_url"] = window.location.href;
    product["description"] =
      description != undefined ? description : data.content;
    product["images"] = data.images;
    product["variants"] = variants;
    product["designed"] = -1;
    product["trending"] = trending === true ? 1 : 0;
    product["feedback"] = null;
    product["tags"] = tags;
    product["rank"] = null;
    product["vender_id"] = data.id;
    // console.log(product);
    send(product, "canawan");
  }

  function category() {
    $("#product-listing-container .product").each(function (key, item) {
      setTimeout(function () {
        console.log(key);
        get_shirt99(key, item);

        if (key == $("#product-listing-container .product").length - 1) {
          setTimeout(function () {
            var url_string = window.location.href;
            var page = get("page");
            next_page = parseInt(page) + 1;
            var url = url_string.replace("page=" + page, "page=" + next_page);
            window.location.href = url;
          }, 10000);
        }
      }, 5000 * key);

      function get_shirt99(key, item) {
        var url = "";
        url += $(item).find("a").attr("href");
        window.open(url, "_blank");
      }
    });
  }
}

// bulkggdeals
else if (window.location.href.indexOf("https://bulkggdeals.com") > -1) {
  if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($(".product-json").text());
      description = $(".desc_blk .rte").html();
      variants = [];
      product_type = data.type != "" ? data.type : data.tags[0];
      tags = product_type != undefined ? product_type : "";
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      if (data.variants[0].option3 != undefined) {
        designed = 0;
        variant = {
          sku: data.variants[0].sku,
          image:
            data.variants[0].featured_image != null
              ? data.variants[0].featured_image.src
              : data.images[0],
          option1: "Crystal Clear",
          option2: "One Size",
          origin_price: true,
          price: 16.95,
          cost: 16.95,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      } else {
        designed = -1;
        data.variants.forEach(function (variant, variant_key) {
          variant = {
            sku: variant.sku,
            image:
              variant.featured_image != null
                ? variant.featured_image.src
                : data.images[0],
            option1:
              variant.option1 != null ? variant.option1 : "Crystal Clear",
            option2: variant.option2 != null ? variant.option2 : "One Size",
            origin_price: true,
            price: parseFloat(variant.price / 100).toFixed(2),
            cost: parseFloat(variant.price / 100).toFixed(2),
            shipping_cost: 0,
            quantity: 9999,
          };
          variants.push(variant);
        });
      }

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Sneakers";
      product["gender"] = "All";
      product["vender"] = "bulkggdeals";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = designed;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      send(product, "bulkggdeals");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      $(".collection-grid .element").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".collection-grid .element").length - 1) {
            setTimeout(function () {
              var url_string = window.location.href;
              var page = get("page");
              next_page = parseInt(page) + 1;
              var url = url_string.replace("page=" + page, "page=" + next_page);
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = "https://bulkggdeals.com";
          url += $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}
// MERCHFACTORY
// "https://excitedsport.com/product/"
else if (window.location.href.indexOf("https://excitedsport.com/") > -1) {
  if (window.location.href.indexOf("/product/") > -1) {
    $(window).ready(function () {
      console.log("hello");
      data = JSON.parse($(".variations_form ").attr("data-product_variations"));
      //data2 = $(".variations_form ").attr('data-product_variations')
      //console.log(data2);
      description = $("#tab-description").html();
      //console.log(description);
      tags = "";
      images = [];
      variants = [];
      product_type = data.type != "" ? data.type : data.tags[0]; //chua tim
      catalog = $(".woocommerce-breadcrumb > a:nth-child(3)").text();
      console.log("cata");
      console.log(catalog);

      // content = $("head").html();
      // content1 = content.split('"tags":"');
      // if(content1[1] != undefined){
      // 	content2 = content1[1].split('"}');
      // 	tags = content2[0].trim();
      // }

      $(".woocommerce-product-gallery__image").each(function (
        image_key,
        image
      ) {
        images[image_key] = $(image).find("img").attr("src");
      });
      //console.log(images);
      data.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image: variant.image.full_src,
          option1:
            variant.attributes.attribute_style != undefined
              ? variant.attributes.attribute_style
              : variant.attributes.attribute_color != undefined
              ? variant.attributes.attribute_color
              : "Crystal Clear",
          option2:
            variant.attributes.attribute_size != undefined
              ? variant.attributes.attribute_size
              : "One Size",
          origin_price: true,
          price: variant.display_price,
          cost: variant.display_price,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = $(".product_title").text();
      product["product_type"] = catalog;
      product["gender"] = "All";
      product["vender"] = "excitedsport";
      product["vender_url"] = window.location.href;
      product["description"] = description;
      product["images"] = images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = $(".variations_form ").attr("data-product_id");
      send(product, "excitedsport");
    });
  } else if (window.location.href.indexOf("/product-category/") > -1) {
    $(window).ready(function () {
      $(".products > .product-small").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".products > .product-small").length - 1) {
            setTimeout(function () {
              if (window.location.href.indexOf("/page/") > -1) {
                page = $(".page-number.current").text();
                next_page = parseInt(page) + 1;
                var url_string = window.location.href;
                var url = url_string.replace(
                  "/page/" + page,
                  "/page/" + next_page
                );
              } else {
                var url_string = window.location.href;
                var url = url_string + "page/2";
              }
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

// https://www.carrollscove.com
// carrollscove-nfl
else if (window.location.href.indexOf("https://www.carrollscove.com") > -1) {
  if (window.location.href.indexOf("/tp") > -1) {
    $(window).ready(function () {
      console.log("hello");

      description = $("#tab1default").html();
      //console.log(description);
      tags = "Car Seat Cover";
      images = [];
      variants = [];
      product_type = "Car Seat Cover";
      catalog = "Car Seat Cover";
      im = $(".item-left").find("a").attr("href");

      images.push(im);
      console.log($("h1").text());
      console.log(description);
      console.log(im);
      console.log($(".rightcode").text());
      variant = {
        sku: $("rightcode").text(),
        image: images[0],
        option1: "Crystal Clear",
        option2: "One Size",
        origin_price: true,
        price: 45.95,
        cost: 45.95,
        shipping_cost: 0,
        quantity: 9999,
      };
      variants.push(variant);

      product = {};
      product["store"] = true;
      product["title"] = $("h1").text();
      product["product_type"] = catalog;
      product["gender"] = "All";
      product["vender"] = "carrollscove-nfl";
      product["vender_url"] = window.location.href;
      product["description"] = description;
      product["images"] = images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = $("rightcode").text();
      send(product, "carrollscove-nfl");
    });
  } else if (window.location.href.indexOf("/father") > -1) {
    console.log("bung link");
    $(window).ready(function () {
      $(".item-box").each(function (key, item) {
        console.log(item);

        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          // if(key == $(".products li").length - 1){
          // 	setTimeout(function(){
          // 		page = $(".page-numbers.current").text();
          // 		next_page = parseInt(page) + 1;
          // 		var url_string  = window.location.href;
          // 		var url = url_string.replace('/page/'+page,'/page/'+next_page);
          // 		window.location.href = url;
          // 	}, 10000);
          // }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = "https://www.carrollscove.com/";
          url += $(item).find($(".item-box-img")).find("a").attr("href");
          console.log(url);

          window.open(url, "_blank");
        }
      });
    });
  } else {
    console.log("k nhan dc link");
  }
}

// https://www.numercy.com
// numercy
else if (window.location.href.indexOf("https://www.numercy.com") > -1) {
  //
  console.log("alolo");
  if (window.location.href.indexOf("nfl-teams") > -1) {
    console.log("bung");
    $(window).ready(function () {
      $(".product").each(function (key, item) {
        //console.log(item);

        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".product").length - 1) {
            setTimeout(function () {
              console.log("chuyen link");
              page = $(".pagination-item.pagination-item--current")
                .text()
                .trim();
              next_page = parseInt(page) + 1;
              console.log(page);
              console.log(next_page);
              var url_string = window.location.href;
              var url = url_string.replace(
                "&page=" + page,
                "&page=" + next_page
              );
              console.log(url);
              window.location.href = url;
            }, 10000);
          }
        }, 7000 * key);

        function get_shirt99(key, item) {
          //var url = 'https://www.numercy.com/';
          url = $(item).find($(".card-figure")).find("a").attr("href");
          console.log(url);

          window.open(url, "_blank");
        }
      });
    });
  } else if (window.location.href.indexOf("/") > -1) {
    $(window).ready(function () {
      console.log("hello");
      console.log($(".productView").attr("data-analytics-sent"));
      check_key = 0;
      var interval_obj = setInterval(function () {
        if ($(".productView").attr("data-analytics-sent").length > 0) {
          clearInterval(interval_obj);
          data = JSON.parse($(".productView").attr("data-analytics-sent"));
          description = $("#tab-description").html();
          //console.log(description);
          tags = "nfl";
          images = [];
          variants = [];
          product_type = "nfl";
          catalog = "nfl";
          im = $(".productView-img-container").find("a").attr("href");

          images.push(im);

          console.log(description);
          console.log(im);
          title = data.name;
          console.log(title);
          console.log(data.price);
          variant = {
            sku: null,
            image: images[0],
            option1: "Crystal Clear",
            option2: "One Size",
            origin_price: true,
            price: data.price,
            cost: data.price,
            shipping_cost: 0,
            quantity: 9999,
          };
          variants.push(variant);

          product = {};
          product["store"] = true;
          product["title"] = title;
          product["product_type"] = catalog;
          product["gender"] = "All";
          product["vender"] = "numercy";
          product["vender_url"] = window.location.href;
          product["description"] = description;
          product["images"] = images;
          product["variants"] = variants;
          product["designed"] = -1;
          product["trending"] = trending === true ? 1 : 0;
          product["feedback"] = null;
          product["tags"] = tags;
          product["rank"] = null;
          product["vender_id"] = data.product_id;
          send(product, "numercy");
        } else {
          check_key++;
          if (check_key >= 50) console.log("error");
        }
      }, 500);
    });
  } else {
    console.log("k nhan dc link");
  }
}

//https://www.overstock.com
else if (window.location.href.indexOf("overstock.com") > -1) {
  console.log("overstock");
  if (window.location.href.indexOf("/product.html?") > -1) {
    console.log("ahihi");
    $(window).ready(function () {
      data = JSON.parse($("#json-ld").text());
      description = data.description;
      variants = [];
      tags = "";
      product_type = $(".breadcrumbs li:nth-last-child(1)").text();
      console.log(product_type);

      data.variants.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.offers.price / 100).toFixed(2),
          cost: parseFloat(variant.offers.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = false;
      product["title"] = data.name;
      product["product_type"] = null;
      product["gender"] = "All";
      product["vender"] = "wearwanta";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.image;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = null;
      product["rank"] = null;
      product["vender_id"] = data.id;
      //send(product,'wearwanta');
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    console.log("dm");
    $(window).ready(function () {
      $("#Collection .grid-view-item").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $("#Collection .grid-view-item").length - 1) {
            setTimeout(function () {
              var url_string = window.location.href;
              var page = get("page");
              next_page = parseInt(page) + 1;
              var url = url_string.replace("page=" + page, "page=" + next_page);
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = "https://wearwanta.com";
          url += $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

// https://hontee.world
else if (
  window.location.href.indexOf("https://www.hontee.world") > -1 ||
  window.location.href.indexOf("https://hontee.world") > -1
) {
  if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      description = $("#tabs > div:nth-child(3)").html();
      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Sneakers";
      product["gender"] = "All";
      product["vender"] = "hontee";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = 0;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = null;
      product["option2_name"] = null;
      product["option1_picture"] = 1;
      send(product, "hontee");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      $(".medium-up--one-fifth").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".medium-up--one-fifth").length - 1) {
            setTimeout(function () {
              var url_string = window.location.href;
              var page = get("page");
              next_page = parseInt(page) + 1;
              var url = url_string.replace("page=" + page, "page=" + next_page);
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = "https://hontee.world";
          url += $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

// https://huahongshirt
else if (
  window.location.href.indexOf("https://www.huahongshirt.myshopify.com") > -1 ||
  window.location.href.indexOf("https://huahongshirt.myshopify.com") > -1
) {
  if (
    window.location.href.indexOf(
      "https://huahongshirt.myshopify.com/#MainContent"
    ) > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      description = null;
      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "T-Shirt";
      product["gender"] = "All";
      product["vender"] = "huahongshirt";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = 0;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = null;
      product["option2_name"] = null;
      product["option1_picture"] = 1;
      send(product, "huahongshirt");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      $(".supports-js").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".supports-js").length - 1) {
            setTimeout(function () {
              var url_string = window.location.href;
              var page = get("page");
              next_page = parseInt(page) + 1;
              var url = url_string.replace("page=" + page, "page=" + next_page);
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = "https://huahongshirt.myshopify.com";
          url += $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

// https://gothslove.myshopify.com
else if (
  window.location.href.indexOf("https://www.gothslove.myshopify.com") > -1 ||
  window.location.href.indexOf("https://gothslove.myshopify.com") > -1
) {
  if (
    window.location.href.indexOf(
      "https://gothslove.myshopify.com/#MainContent"
    ) > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      description = null;
      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "T-Shirt";
      product["gender"] = "All";
      product["vender"] = "gothslove";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = 0;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = null;
      product["option2_name"] = null;
      product["option1_picture"] = 1;
      send(product, "gothslove");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      $(".supports-js").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".supports-js").length - 1) {
            setTimeout(function () {
              var url_string = window.location.href;
              var page = get("page");
              next_page = parseInt(page) + 1;
              var url = url_string.replace("page=" + page, "page=" + next_page);
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = "https://gothslove.myshopify.com";
          url += $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

// https://inkiceshop.myshopify.com
else if (
  window.location.href.indexOf("https://www.inkiceshop.myshopify.com") > -1 ||
  window.location.href.indexOf("https://inkiceshop.myshopify.com") > -1
) {
  if (
    window.location.href.indexOf(
      "https://inkiceshop.myshopify.com/#MainContent"
    ) > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      description = null;
      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "T-Shirt";
      product["gender"] = "All";
      product["vender"] = "inkiceshop";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = 0;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = null;
      product["option2_name"] = null;
      product["option1_picture"] = 1;
      send(product, "inkiceshop");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      $("#Collection .grid-view-item").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $("#Collection .grid-view-item").length - 1) {
            setTimeout(function () {
              var url_string = window.location.href;
              var page = get("page");
              next_page = parseInt(page) + 1;
              var url = url_string.replace("page=" + page, "page=" + next_page);
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = "https://inkiceshop.myshopify.com";
          url += $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

// https:///anezen.com
else if (
  window.location.href.indexOf("https://anezen.com") > -1 ||
  window.location.href.indexOf("https://wwww.anezen.com") > -1
) {
  if (window.location.href.indexOf("https:///anezen.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/product") > -1) {
    console.log("run");
    $(window).ready(function () {
      data = JSON.parse($(".variations_form ").attr("data-product_variations"));
      console.log(JSON.stringify(data));
      description = $("#tab-description").html();
      console.log(description);
      images = [];
      variants = [];
      tags = "Hawaiian Shirt";
      product_type = "Hawaiian Shirt";

      $(".woocommerce-product-gallery__image").each(function (
        image_key,
        image
      ) {
        images[image_key] = $(image).find("a").attr("href");
      });
      console.log(images);
      data.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image: variant.image.full_src,
          option1: "Crystal Clear",
          option2:
            variant.attributes.attribute_pa_size != undefined
              ? variant.attributes.attribute_pa_size
              : "One Size",
          origin_price: true,
          price: variant.display_price,
          cost: variant.display_price,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });
      console.log(variants);

      product = {};
      product["store"] = true;
      product["title"] = $(".product_title").text();
      product["product_type"] = $(".product_cat").text();
      product["gender"] = "All";
      product["vender"] = "merchfactory";
      product["vender_url"] = window.location.href;
      product["description"] = description;
      product["images"] = images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = $(".variations_form ").attr("data-product_id");
      product["specifics"] = null;
      product["option1_name"] = null;
      product["option2_name"] = null;
      product["option1_picture"] = 1;
      send(product, "anezen");
    });
  } else if (window.location.href.indexOf("/collection/") > -1) {
    $(window).ready(function () {
      $(".products > .product-small").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".products > .product-small").length - 1) {
            setTimeout(function () {
              if (window.location.href.indexOf("/page/") > -1) {
                page = $(".page-number.current").text();
                next_page = parseInt(page) + 1;
                var url_string = window.location.href;
                var url = url_string.replace(
                  "/page/" + page,
                  "/page/" + next_page
                );
              } else {
                var url_string = window.location.href;
                var url = url_string + "page/2";
              }
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

// https://4fanshop.com.com
else if (
  window.location.href.indexOf("https://www.4fanshop.com.com") > -1 ||
  window.location.href.indexOf("https://4fanshop.com") > -1
) {
  if (window.location.href.indexOf("https://4fanshop.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        console.log(parseFloat(variant.price / 100).toFixed(2));
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Shirt";
      product["gender"] = "All";
      product["vender"] = "4fanshop";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "4fanshop");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      $(".grid-uniform .grid-item").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".grid-uniform .grid-item").length - 1) {
            setTimeout(function () {
              var url_string = window.location.href;
              var page = get("page");
              next_page = parseInt(page) + 1;
              var url = url_string.replace("page=" + page, "page=" + next_page);
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = "https://4fanshop.com";
          url += $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

// https://merchsport.com.com
else if (
  window.location.href.indexOf("https://merchsports.com") > -1 ||
  window.location.href.indexOf("https://www.merchsports.com") > -1
) {
  console.log("sport");
  if (
    window.location.href.indexOf("https://merchsport.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($(".variations_form ").attr("data-product_variations"));
      //console.log(JSON.stringify(data));
      description = $("#tab-description")
        .html()
        .replace("<h2>Description</h2>", "")
        .replace("support@merchsports.com", "contact@mantadrop.com")
        .replace("1sttheworld", "mantadrop.com");
      //description = null;
      product_type = data.type != "" ? data.type : data.tags[0];
      tags = "";
      images = [];
      content = $("head").html();
      content1 = content.split('"tags":"');
      if (content1[1] != undefined) {
        content2 = content1[1].split('"}');
        tags = content2[0].trim();
      }
      console.log(tags);
      $(".woocommerce-product-gallery__image").each(function (
        image_key,
        image
      ) {
        images[image_key] = $(image).find("img").attr("src");
      });

      variants = [];

      console.log(images[0]);

      option1_name = "Style";
      option2_name = "Size";
      option1_picture = 1;

      data.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image: variant.image.full_src,
          option1:
            variant.attributes.attribute_style != undefined
              ? variant.attributes.attribute_style
              : variant.attributes.attribute_color != undefined
              ? variant.attributes.attribute_color
              : "Crystal Clear",
          option2:
            variant.attributes.attribute_size != undefined
              ? variant.attributes.attribute_size
              : "One Size",
          origin_price: true,
          price: parseFloat(variant.display_price) - 2,
          cost: parseFloat(variant.display_price) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });
      //console.log(variants);
      product = {};
      product["store"] = true;
      product["title"] = $(".product_title").text();
      product["product_type"] = "boost";
      product["gender"] = "All";
      product["vender"] = "merchsports";
      product["vender_url"] = window.location.href;
      product["description"] = description != undefined ? description : null;
      product["images"] = images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = $(".variations_form ").attr("data-product_id");
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "merchsports");
    });
  } else if (window.location.href.indexOf("/page/") > -1) {
    $(window).ready(function () {
      $(".products li").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".products li").length - 1) {
            setTimeout(function () {
              page = $(".page-numbers.current")[0].textContent;
              console.log(page);
              next_page = parseInt(page) + 1;
              var url_string = window.location.href;
              var url = url_string.replace(
                "/page/" + page,
                "/page/" + next_page
              );
              window.location.href = url;
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

// https://shoesmark.com.com.com
else if (
  window.location.href.indexOf("https://shoesmark.com") > -1 ||
  window.location.href.indexOf("https://www.shoesmark.com") > -1
) {
  console.log("sport");
  if (window.location.href.indexOf("https://shoesmark.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/product/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($(".variations_form ").attr("data-product_variations"));
      console.log(JSON.stringify(data));
      description = $(".woocommerce-product-details__short-description").html();
      //description = null;
      product_type = data.type != "" ? data.type : data.tags[0];
      tags = "";
      images = [];
      content = $("head").html();
      content1 = content.split('"tags":"');
      if (content1[1] != undefined) {
        content2 = content1[1].split('"}');
        tags = content2[0].trim();
      }
      console.log(tags);
      $(".woocommerce-product-gallery__image--placeholder").each(function (
        image_key,
        image
      ) {
        images[image_key] = $(image).find("img").attr("src");
      });
      variants = [];

      // console.log(images);

      option1_name = "Style";
      option2_name = "Size";
      option1_picture = 0;
      // if(variant.image.full_src != null) {
      // 	variant.image.full_src
      // } else {
      // 	images[0]
      // }
      data.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image:
            variant.image.full_src != null ? variant.image.full_src : images[0],
          option1:
            variant.attributes.attribute_style != undefined
              ? variant.attributes.attribute_style
              : variant.attributes.attribute_color != undefined
              ? variant.attributes.attribute_color
              : "Crystal Clear",
          option2:
            variant.attributes.attribute_size != undefined
              ? variant.attributes.attribute_size
              : "One Size",
          origin_price: true,
          price: parseFloat(variant.display_price) - 2,
          cost: parseFloat(variant.display_price) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });
      //console.log(variants);
      product = {};
      product["store"] = true;
      product["title"] = $(".product_title").text();
      product["product_type"] = "shoes";
      product["gender"] = "All";
      product["vender"] = "shoesmark";
      product["vender_url"] = window.location.href;
      product["description"] = description != undefined ? description : null;
      product["images"] = images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = $(".variations_form ").attr("data-product_id");
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "shoesmark");
    });
  } else if (window.location.href.indexOf("/page/") > -1) {
    console.log("get product link");
    $(window).ready(function () {
      $(".image-fade_in_back").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".image-fade_in_back").length - 1) {
            setTimeout(function () {
              page = $(".page-numbers .current").text();
              console.log(page);
              next_page = parseInt(page) + 1;
              var url_string = window.location.href;
              var url = url_string.replace(
                "/page/" + page,
                "/page/" + next_page
              );
              window.location.href = url;
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

//////////
// https://storeontop.com.com.com
else if (
  window.location.href.indexOf("https://storeontop.com") > -1 ||
  window.location.href.indexOf("https://www.storeontop.com") > -1 ||
  window.location.href.indexOf("storeontop.com") > -1
) {
  // console.log('sport');
  if (
    window.location.href.indexOf("https://storeontop.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("?page=") > -1) {
    setTimeout(function () {
      console.log("get product link");
      $(window).ready(function () {
        $(".ProductItem").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".ProductItem").length - 1) {
              setTimeout(function () {
                let page = $(".page-item.active").text();
                console.log(page);
                next_page = parseInt(page) + 1;
                var url_string = window.location.href;
                var url = url_string.replace(
                  "?page=" + page,
                  "?page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            url = "https://storeontop.com" + $(item).find("a").attr("href");
            console.log(url);
            window.open(url, "_blank");
          }
        });
      });
    }, 10000);
  } else {
    ///
    console.log("get hang");

    $(window).ready(function () {
      setTimeout(function () {
        data = JSON.parse(
          document.querySelector('script[type="application/ld+json"]').innerText
        );
        //console.log(data.productID);
        product_id = data.productID;

        title = $(".ProductTitle").text();
        metas = $("meta");

        mLength = metas.length;
        // console.log(mLength);
        // console.log(metas[0]);
        price = 0;
        for (i = 0; i < mLength; i++) {
          if (metas[i].getAttribute("property") == undefined) {
            //console.log("ko co meta price");
          }
          if (metas[i].getAttribute("property") == "product:price:amount") {
            price = metas[i].getAttribute("content");
            //return metas[i].getAttribute('content');
          } else {
            //console.log("ko co meta price");
            //console.log(metas[i]);
          }
        }
        // console.log(price);
        price = parseFloat(price) - 2;
        if (price == 0) {
          return false;
          window.close();
        }
        description = $(".ProductDescription").html();
        product_type = null;
        tags = null;
        images = [];
        $(".img-fluid").each(function (image_key, image) {
          images[image_key] = $(image).attr("src");
        });
        // console.log(images);

        variants = [];

        // console.log(images);

        option1_name = "";
        option2_name = "Size";
        option1_picture = 0;
        listsize = $(".Option");
        //console.log(listsize);
        if (listsize.length == 1) {
          option2_name = "";
          variant = {
            sku: null,
            image: images[0],
            option1: "Crystal Clear",
            option2: "One Size",
            origin_price: true,
            price: price,
            cost: price,
            shipping_cost: 0,
            quantity: 9999,
          };
          variants.push(variant);
          product = {};
          product["store"] = true;
          product["title"] = title;
          product["product_type"] = "All";
          product["gender"] = "All";
          product["vender"] = "storeontop";
          product["vender_url"] = window.location.href;
          product["description"] =
            description != undefined ? description : null;
          product["images"] = images;
          product["variants"] = variants;
          product["designed"] = -1;
          product["trending"] = trending === true ? 1 : 0;
          product["feedback"] = null;
          product["tags"] = tags;
          product["rank"] = null;
          product["vender_id"] = product_id;
          product["specifics"] = null;
          product["option1_name"] = option1_name;
          product["option2_name"] = option2_name;
          product["option1_picture"] = option1_picture;
          // console.log(JSON.stringify(product));
          send(product, "storeontop");
        } else {
          // console.log("nhieu varians");
          listsize.each(function (variant_key, listx) {
            // console.log(listx);
            // console.log(variant_key);
            variant = {
              sku: null,
              image: images[0],
              option1: "Crystal Clear",
              option2: $(listx).text(),
              origin_price: true,
              price: price,
              cost: price,
              shipping_cost: 0,
              quantity: 9999,
            };
            // console.log(variant);
            variants.push(variant);
          });
          product = {};
          product["store"] = true;
          product["title"] = title;
          product["product_type"] = "All";
          product["gender"] = "All";
          product["vender"] = "storeontop";
          product["vender_url"] = window.location.href;
          product["description"] =
            description != undefined ? description : null;
          product["images"] = images;
          product["variants"] = variants;
          product["designed"] = -1;
          product["trending"] = trending === true ? 1 : 0;
          product["feedback"] = null;
          product["tags"] = tags;
          product["rank"] = null;
          product["vender_id"] = product_id;
          product["specifics"] = null;
          product["option1_name"] = option1_name;
          product["option2_name"] = option2_name;
          product["option1_picture"] = option1_picture;
          // console.log(JSON.stringify(product));
          send(product, "storeontop");
        }
      }, 5000);
    });
    ///
  }
}

// morrays.shop
else if (
  window.location.href.indexOf("https://www.morrays.shop") > -1 ||
  window.location.href.indexOf("https://morrays.shop") > -1
) {
  if (window.location.href.indexOf("https://morrays.shop/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        console.log(parseFloat(variant.price / 100).toFixed(2));
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Shirt";
      product["gender"] = "All";
      product["vender"] = "morrays";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "morrays");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        console.log($(".grid-uniform .grid__item"));
        $(".grid-uniform .grid__item").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-uniform .grid__item").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            //var url = 'https://morrays.shop';
            url = $(item).find("a").attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

// morrays.shop
else if (
  window.location.href.indexOf("https://www.monmonland.com") > -1 ||
  window.location.href.indexOf("https://monmonland.com") > -1
) {
  if (
    window.location.href.indexOf("https://monmonland.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "monmonland";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "monmonland");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        console.log($(".grid .grid__item"));
        $(".grid .grid__item").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid .grid__item").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://monmonland.com";
            url = $(item).find("a").attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

// shopperpepper.com
else if (
  window.location.href.indexOf("https://www.shopperpepper.com") > -1 ||
  window.location.href.indexOf("https://shopperpepper.com") > -1
) {
  if (
    window.location.href.indexOf("https://shopperpepper.com/#MainContent") > -1
  ) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        console.log($(".grid-uniform .grid__item"));
        $(".grid-uniform .grid__item").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-uniform .grid__item").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://shopperpepper.com";
            url = $(item).find("a").attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "shopperpepper";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "shopperpepper");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        console.log($(".grid-uniform .grid__item"));
        $(".grid-uniform .grid__item").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-uniform .grid__item").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://shopperpepper.com";
            url = $(item).find("a").attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

// shopperpepper.com
else if (
  window.location.href.indexOf("https://www.oneshotonecute.com") > -1 ||
  window.location.href.indexOf("https://oneshotonecute.com") > -1
) {
  if (
    window.location.href.indexOf("https://oneshotonecute.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "oneshotonecute";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "oneshotonecute");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        console.log($(".grid-product__image-link"));
        $(".grid-product__image-link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-product__image-link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://oneshotonecute.com";
            url = $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

// parisflavor.com
else if (
  window.location.href.indexOf("https://www.esfranki.co") > -1 ||
  window.location.href.indexOf("https://esfranki.co") > -1
) {
  if (window.location.href.indexOf("https://esfranki.co/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "esfranki";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "esfranki");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid-product__image-link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-product__image-link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://esfranki.co";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

// parisflavor.com
else if (
  window.location.href.indexOf("https://www.shopcooltools.com") > -1 ||
  window.location.href.indexOf("https://shopcooltools.com") > -1
) {
  if (
    window.location.href.indexOf("https://shopcooltools.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "shopcooltools";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "shopcooltools");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid-product__image-link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-product__image-link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://shopcooltools.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

// parisflavor.com
else if (
  window.location.href.indexOf("https://www.alpha-buying.com") > -1 ||
  window.location.href.indexOf("https://alpha-buying.com") > -1
) {
  if (
    window.location.href.indexOf("https://alpha-buying.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "alpha-buying";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "alpha-buying");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid-product__image-link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-product__image-link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://alpha-buying.com";
            url = $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

// kacify.com
else if (
  window.location.href.indexOf("https://www.kacify.com") > -1 ||
  window.location.href.indexOf("https://kacify.com") > -1
) {
  if (window.location.href.indexOf("https://kacify.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      idsp = $(".product-wrap").attr("data-product-id");
      console.log(idsp);
      let text = "data-product-json-" + idsp;
      let sc = $(`script[${text}]`);

      if (!sc.length) {
        window.close();
      }

      console.log(sc.text());

      data = JSON.parse(sc.text());
      description = data.description;
      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "kacify";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "kacify");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".product-list-item-thumbnail").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".product-list-item-thumbnail").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://kacify.com";
            url = url + $(item).find("a").attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

// parisflavor.com
else if (
  window.location.href.indexOf("https://www.loomrack.com") > -1 ||
  window.location.href.indexOf("https://loomrack.com") > -1
) {
  if (window.location.href.indexOf("https://loomrack.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "loomrack";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "loomrack");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid-product__image-link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-product__image-link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://loomrack.com";
            url = $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

// parisflavor.com
else if (
  window.location.href.indexOf("https://www.tumblemeow.myshopify.com") > -1 ||
  window.location.href.indexOf("https://tumblemeow.myshopify.com") > -1
) {
  if (
    window.location.href.indexOf(
      "https://tumblemeow.myshopify.com/#MainContent"
    ) > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "tumblemeow.myshopify";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "tumblemeow.myshopify");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid-product__image-link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-product__image-link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://tumblemeow.myshopify.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

// dealonova.com
else if (
  window.location.href.indexOf("https://www.dealonovay.com") > -1 ||
  window.location.href.indexOf("https://dealonova.com") > -1
) {
  if (window.location.href.indexOf("https://dealonova.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "dealonova";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "dealonova");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid-view-item__link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-view-item__link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://dealonova.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
} else if (
  window.location.href.indexOf("https://www.inspireuplift.com") > -1 ||
  window.location.href.indexOf("https://inspireuplift.com") > -1
) {
  if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      console.log("tesstttt");
      productid = $(".product").attr("id");
      console.log(productid);
      content = $("body").html();
      ("$('#product-557239599115).product({");
      content1 = content.split(
        "document.addEventListener('DOMContentLoaded', function() "
      );
      console.log(content1[1]);
      chuoi = `$('#` + productid + `').product({`;
      console.log(chuoi);
      content2 = content1[1].split(chuoi);
      //console.log(content2[1]);
      content3 = content2[1].replace("product: ", "").slice(0, -1);
      //console.log(content3);
      content4 = content3.split("selectedVariantId:");
      content5 = content4[0].trim().slice(0, -1);
      //console.log(content5);
      data = JSON.parse(content5);
      description = $("#tabs > div:nth-child(3)").html();
      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "inspireuplift";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "inspireuplift");
    });
  }
} else if (
  window.location.href.indexOf("Desktop/All.html") > -1 ||
  window.location.href.indexOf("Desktop/All.html") > -1
) {
  console.log("run");
  $(window).ready(function () {
    $(".product-item__image").each(function (key, item) {
      setTimeout(function () {
        console.log(key);
        get_shirt99(key, item);

        if (key == $(".product-item__image").length - 1) {
          window.close();
        }
      }, 10000 * key);

      function get_shirt99(key, item) {
        var url = "https://inspireuplift.com";
        url = $(item).attr("href");
        window.open(url, "_blank");
      }
    });
  });
}

// thebouncetee.com
else if (
  window.location.href.indexOf("https://www.thebouncetee.com") > -1 ||
  window.location.href.indexOf("https://thebouncetee.com") > -1
) {
  if (
    window.location.href.indexOf("https://thebouncetee.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = null;
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      console.log("hinh");
      console.log(data.images);

      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: 1,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "thebouncetee";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "thebouncetee");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid-view-item__link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-view-item__link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://thebouncetee.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

// ultras.com
else if (
  window.location.href.indexOf("https://www.ultras.com") > -1 ||
  window.location.href.indexOf("https://ultras.com") > -1
) {
  if (window.location.href.indexOf("https://ultras.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      console.log("hinh");
      console.log(data.images);

      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: 1,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "ultras";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = null;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      console.log(JSON.stringify(product));
      send(product, "ultras");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid__item>div>.grid-link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid__item>div>.grid-link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://ultras.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

// customkiks.com
else if (
  window.location.href.indexOf("https://www.customkiks.com") > -1 ||
  window.location.href.indexOf("https://customkiks.com") > -1
) {
  if (
    window.location.href.indexOf("https://customkiks.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      // data = JSON.parse($("#ProductJson-product-template").text());
      // console.log(JSON.stringify(data));
      // description = data.description;
      console.log("hihihihihihihi");
      let html = $("body").html();
      let scriptText = html.split("};var product = ");
      let scriptText2 = scriptText[1].split("product.variants");
      data1 = scriptText2[0].trim();
      data2 = data1.slice(0, -1);
      // console.log(data2);
      variants = [];
      tags = "";
      images = [];
      data = JSON.parse(data2);
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      console.log(data2);
      description = $("#tab-description").html();
      divimage = $("#gl_thum")
        .find("div")
        .each(function (key, item) {
          let aaaa = $(item).attr("data-href");
          images.push(aaaa);
          console.log(aaaa);
        });

      console.log("hinh");
      console.log(images);

      let i = 0;
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: 1,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "customkiks";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      console.log(JSON.stringify(product));
      send(product, "customkiks");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid__item>div>.grid-link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid__item>div>.grid-link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://customkiks.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

// https://shoeworld.us.com.com.com
else if (
  window.location.href.indexOf("https://shoeworld.us") > -1 ||
  window.location.href.indexOf("https://www.shoeworld.us") > -1
) {
  console.log("sport");
  if (window.location.href.indexOf("https://shoesmark.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/product/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($(".variations_form ").attr("data-product_variations"));
      console.log(JSON.stringify(data));
      description = $(".woocommerce-product-details__short-description").html();
      //description = null;
      product_type = data.type != "" ? data.type : data.tags[0];
      tags = "";
      images = [];
      content = $("head").html();
      content1 = content.split('"tags":"');
      if (content1[1] != undefined) {
        content2 = content1[1].split('"}');
        tags = content2[0].trim();
      }
      console.log(tags);
      $(".woocommerce-product-gallery__image--placeholder").each(function (
        image_key,
        image
      ) {
        images[image_key] = $(image).find("img").attr("src");
      });
      variants = [];

      // console.log(images);

      option1_name = "Style";
      option2_name = "Size";
      option1_picture = 0;

      data.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image:
            variant.image.full_src != null ? variant.image.full_src : images[0],
          option1:
            variant.attributes.attribute_style != undefined
              ? variant.attributes.attribute_style
              : variant.attributes.attribute_color != undefined
              ? variant.attributes.attribute_color
              : "Crystal Clear",
          option2:
            variant.attributes.attribute_size != undefined
              ? variant.attributes.attribute_size
              : "One Size",
          origin_price: true,
          price: parseFloat(variant.display_price) - 2,
          cost: parseFloat(variant.display_price) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });
      //console.log(variants);
      product = {};
      product["store"] = true;
      product["title"] = $(".product_title").text();
      product["product_type"] = "shoes";
      product["gender"] = "All";
      product["vender"] = "shoeworld";
      product["vender_url"] = window.location.href;
      product["description"] = description != undefined ? description : null;
      product["images"] = images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = $(".variations_form ").attr("data-product_id");
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      console.log(JSON.stringify(product));
      send(product, "shoeworld");
    });
  } else if (window.location.href.indexOf("/page/") > -1) {
    console.log("get product link");
    $(window).ready(function () {
      $(".image-fade_in_back").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".image-fade_in_back").length - 1) {
            setTimeout(function () {
              page = $(".page-numbers .current").text();
              console.log(page);
              next_page = parseInt(page) + 1;
              var url_string = window.location.href;
              var url = url_string.replace(
                "/page/" + page,
                "/page/" + next_page
              );
              window.location.href = url;
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

//======================================
//https://www.costco.com
else if (
  window.location.href.indexOf("https://www.costco.com") > -1 ||
  window.location.href.indexOf("https://costco.com") > -1
) {
  if (window.location.href.indexOf(".product.") > -1) {
    $(window).ready(function () {
      console.log("tesstttt");
      scProdId = $(".scProdId").attr("sc.ProdId");
      //console.log(scProdId);
      variants = [];
      tags = "";
      images = [];

      setTimeout(function () {
        description = $(".product-info-description").html();

        var crumb = $("#crumbs_ul li");
        var item = crumb[crumb.length - 1];
        console.log(item);
        product_type = item.textContent.trim();
        console.log(product_type);
        imagelist = $("#RICHFXViewerContainer___richfx_id_0 img").each(
          function (key, item) {
            let aaaa = $(item).attr("src");
            if (aaaa.indexOf("video") > -1) {
              console.log("video");
            } else {
              console.log("........................#########");

              console.log(aaaa);
              images.push(aaaa);
            }
          }
        );

        console.log(images);
        tag = null;

        // price = $('.pull-right>.value').text();
        // console.log(price);

        option1_picture = 0;

        let html = $("body").html();
        let scriptText = html.split("// <![CDATA[");
        let scriptText2 = scriptText[1].split("// ]]>");
        //console.log(scriptText2[0]);
        let producttext = scriptText2[0].split("var products =");
        let productsok = producttext[1].split("var options =");
        let productjson = productsok[0];
        // console.log(productjson);
        let productjsons = productjson.substring(0, productjson.length - 4);
        //console.log(productjsons);
        data = JSON.parse(productjsons);
        console.log("data", data);
        //console.log('option1');
        let productoptions = productsok[1];
        let jsonoption = productoptions.substring(0, productsok[1].length - 2);
        console.log("jsonoption", jsonoption);
        console.log("asdasdsad");
        let formatoption = jsonoption.replace(/'/g, '"');
        let dataoptions = JSON.parse(formatoption);
        console.log("hello");
        console.log("asd", dataoptions);

        if (dataoptions[0].length == 0) {
          console.log("Khong co options");
          console.log(atob(data[0][0].price));
          variant = {
            sku: null,
            image: images[0],
            option1: null,
            option2: null,
            // 'origin_price' : f,
            price: atob(data[0][0].price),
            cost: atob(data[0][0].price),
            shipping_cost: 0,
            quantity: 9999,
          };
          variants.push(variant);
          console.log(variants);

          product = {};
          product["store"] = true;
          product["title"] = data[0][0].productName;
          product["product_type"] =
            product_type != undefined ? product_type : "Manta-product";
          product["gender"] = "All";
          product["vender"] = "costco";
          product["vender_url"] = window.location.href;
          product["description"] = description;
          product["images"] = images;
          product["variants"] = variants;
          product["designed"] = -1;
          product["trending"] = trending === true ? 1 : 0;
          product["feedback"] = null;
          product["tags"] = tags;
          product["rank"] = null;
          product["vender_id"] = scProdId != undefined ? scProdId : null;
          product["specifics"] = null;
          product["option1_name"] = null;
          product["option2_name"] = null;
          product["option1_picture"] = 0;
          //console.log(JSON.stringify(product));
          send(product, "costco");
        } else if (dataoptions[0].length > 1) {
          console.log(">2 option");
          console.log(dataoptions[0][0]);
          option1_name = dataoptions[0][1].n; //size
          option2_name = dataoptions[0][0].n;
          console.log("so varians");
          console.log(data[0].length);
          data[0].forEach(function (variant, variant_key) {
            let bien0 = variant.options[0];
            let bien1 = variant.options[1];
            console.log("bien0");
            console.log(bien0);
            console.log("bien1");
            console.log(bien1);
            let optionbien1 = dataoptions[0][1].v;
            databien1 = "";
            for (let key of Object.keys(optionbien1)) {
              //console.log(optionbien1[key]);
              if (key == bien1) {
                databien1 = optionbien1[key];
              }
            }
            let optionbien2 = dataoptions[0][0].v;
            databien2 = "";
            for (let key2 of Object.keys(optionbien2)) {
              //console.log(optionbien1[key]);
              if (key2 == bien0) {
                databien2 = optionbien2[key2];
              }
            }

            console.log(databien1);
            console.log(databien2);
            variant = {
              sku: null,
              image:
                variant.parent_img_url != null
                  ? variant.parent_img_url
                  : images[0],
              option1: databien1,
              option2: databien2,
              // 'origin_price' : true,
              price: atob(variant.price),
              cost: atob(variant.price),
              shipping_cost: 0,
              quantity: 9999,
            };
            variants.push(variant);
          });
          console.log(variants);
          product = {};
          product["store"] = true;
          product["title"] = data[0][0].productName;
          product["product_type"] =
            product_type != undefined ? product_type : "Manta-product";
          product["gender"] = "All";
          product["vender"] = "costco";
          product["vender_url"] = window.location.href;
          product["description"] = description;
          product["images"] = images;
          product["variants"] = variants;
          product["designed"] = -1;
          product["trending"] = trending === true ? 1 : 0;
          product["feedback"] = null;
          product["tags"] = tags;
          product["rank"] = null;
          product["vender_id"] = scProdId != undefined ? scProdId : null;
          product["specifics"] = null;
          product["option1_name"] = option1_name;
          product["option2_name"] = option2_name;
          product["option1_picture"] = 0;
          //console.log(JSON.stringify(product));
          send(product, "costco");
        } else if (dataoptions[0].length == 1) {
          console.log("1 options");
          console.log(dataoptions[0][0]);
          option1_name = dataoptions[0][0].n; //size

          console.log("so varians");
          console.log(data[0].length);
          data[0].forEach(function (variant, variant_key) {
            let bien0 = variant.options[0];

            console.log("bien0");
            console.log(bien0);

            let optionbien2 = dataoptions[0][0].v;
            databien2 = "";
            for (let key2 of Object.keys(optionbien2)) {
              //console.log(optionbien1[key]);
              if (key2 == bien0) {
                databien2 = optionbien2[key2];
              }
            }

            console.log(databien2);
            variant = {
              sku: null,
              image:
                variant.parent_img_url != null
                  ? variant.parent_img_url
                  : images[0],
              option1: databien2,
              option2: null,
              // 'origin_price' : true,
              price: atob(variant.price),
              cost: atob(variant.price),
              shipping_cost: 0,
              quantity: 9999,
            };
            variants.push(variant);
          });
          console.log(variants);
          product = {};
          product["store"] = true;
          product["title"] = data[0][0].productName;
          product["product_type"] =
            product_type != undefined ? product_type : "Manta-product";
          product["gender"] = "All";
          product["vender"] = "costco";
          product["vender_url"] = window.location.href;
          product["description"] = description;
          product["images"] = images;
          product["variants"] = variants;
          product["designed"] = -1;
          product["trending"] = trending === true ? 1 : 0;
          product["feedback"] = null;
          product["tags"] = tags;
          product["rank"] = null;
          product["vender_id"] = scProdId != undefined ? scProdId : null;
          product["specifics"] = null;
          product["option1_name"] = option1_name;
          product["option2_name"] = null;
          product["option1_picture"] = 0;
          console.log(JSON.stringify(product));
          send(product, "costco");
        }
      }, 5000);
    });
  } else if (window.location.href.indexOf("costco.com") > -1) {
    console.log("get product link");
    $(window).ready(function () {
      $(".product-tile-set").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".product-tile-set").length - 1) {
            console.log("OK");
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          url = $(item).attr("data-pdp-url");
          window.open(url, "_blank");
        }
      });
    });
  }
}

// https://shoeworld.us.com.com.com
else if (
  window.location.href.indexOf("https://topyeezyshoes.com") > -1 ||
  window.location.href.indexOf("https://www.topyeezyshoes.com") > -1
) {
  console.log("sport");
  if (
    window.location.href.indexOf("https://topyeezyshoes.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/product/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($(".variations_form ").attr("data-product_variations"));
      console.log(JSON.stringify(data));
      description = $(".woocommerce-product-details__short-description").html();
      //description = null;
      product_type = data.type != "" ? data.type : data.tags[0];
      tags = "";
      images = [];
      content = $("head").html();
      content1 = content.split('"tags":"');
      if (content1[1] != undefined) {
        content2 = content1[1].split('"}');
        tags = content2[0].trim();
      }
      console.log(tags);
      $(".woocommerce-product-gallery__image--placeholder").each(function (
        image_key,
        image
      ) {
        images[image_key] = $(image).find("img").attr("src");
      });
      variants = [];

      console.log(images);

      option1_name = "Style";
      option2_name = "Size";
      option1_picture = 0;

      data.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image:
            variant.image.full_src != null ? variant.image.full_src : images[0],
          option1:
            variant.attributes.attribute_style != undefined
              ? variant.attributes.attribute_style
              : variant.attributes.attribute_color != undefined
              ? variant.attributes.attribute_color
              : "Crystal Clear",
          option2:
            variant.attributes.attribute_size != undefined
              ? variant.attributes.attribute_size
              : "One Size",
          origin_price: true,
          price: parseFloat(variant.display_price) - 2,
          cost: parseFloat(variant.display_price) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });
      //console.log(variants);
      product = {};
      product["store"] = true;
      product["title"] = $(".product_title").text();
      product["product_type"] = "shoes";
      product["gender"] = "All";
      product["vender"] = "topyeezyshoes";
      product["vender_url"] = window.location.href;
      product["description"] = description != undefined ? description : null;
      product["images"] = images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = $(".variations_form ").attr("data-product_id");
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "topyeezyshoes");
    });
  } else if (window.location.href.indexOf("/page/") > -1) {
    console.log("get product link");
    $(window).ready(function () {
      $(".image-fade_in_back").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".image-fade_in_back").length - 1) {
            setTimeout(function () {
              page = $(".page-numbers .current").text();
              console.log(page);
              next_page = parseInt(page) + 1;
              var url_string = window.location.href;
              var url = url_string.replace(
                "/page/" + page,
                "/page/" + next_page
              );
              window.location.href = url;
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

// https://customyeezy.us/
else if (
  window.location.href.indexOf("https://customyeezy.us") > -1 ||
  window.location.href.indexOf("https://www.customyeezy.us") > -1
) {
  console.log("sport");
  if (
    window.location.href.indexOf("https://customyeezy.us/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/product/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($(".variations_form ").attr("data-product_variations"));
      console.log(JSON.stringify(data));
      description = $(".woocommerce-product-details__short-description").html();
      //description = null;
      product_type = data.type != "" ? data.type : data.tags[0];
      tags = "";
      images = [];
      content = $("head").html();
      content1 = content.split('"tags":"');
      if (content1[1] != undefined) {
        content2 = content1[1].split('"}');
        tags = content2[0].trim();
      }
      console.log(tags);
      $(".woocommerce-product-gallery__image--placeholder").each(function (
        image_key,
        image
      ) {
        images[image_key] = $(image).find("img").attr("src");
      });
      variants = [];

      // console.log(images);

      option1_name = "Style";
      option2_name = "Size";
      option1_picture = 0;

      data.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image:
            variant.image.full_src != null ? variant.image.full_src : images[0],
          option1:
            variant.attributes.attribute_style != undefined
              ? variant.attributes.attribute_style
              : variant.attributes.attribute_color != undefined
              ? variant.attributes.attribute_color
              : "Crystal Clear",
          option2:
            variant.attributes.attribute_size != undefined
              ? variant.attributes.attribute_size
              : "One Size",
          origin_price: true,
          price: parseFloat(variant.display_price) - 2,
          cost: parseFloat(variant.display_price) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });
      //console.log(variants);
      product = {};
      product["store"] = true;
      product["title"] = $(".product_title").text();
      product["product_type"] = "shoes";
      product["gender"] = "All";
      product["vender"] = "customyeezy";
      product["vender_url"] = window.location.href;
      product["description"] = description != undefined ? description : null;
      product["images"] = images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = $(".variations_form ").attr("data-product_id");
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "customyeezy");
    });
  } else if (window.location.href.indexOf("/page/") > -1) {
    console.log("get product link");
    $(window).ready(function () {
      $(".image-fade_in_back").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".image-fade_in_back").length - 1) {
            setTimeout(function () {
              page = $(".page-numbers .current").text();
              console.log(page);
              next_page = parseInt(page) + 1;
              var url_string = window.location.href;
              var url = url_string.replace(
                "/page/" + page,
                "/page/" + next_page
              );
              window.location.href = url;
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

// https://4fanshop.com.com
else if (
  window.location.href.indexOf("https://www.palmyhomey.com") > -1 ||
  window.location.href.indexOf("https://palmyhomey.com") > -1
) {
  if (
    window.location.href.indexOf("https://palmyhomey.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      description = $(".s-tab-content").html();
      title = $(".product__name").text().trim();
      idsp = $(".jdgm-widget").attr("data-id");
      //console.log(idsp);

      variants = [];
      tags = "";
      product_type = "Manta-Products";
      option1_name = "Size";
      option2_name = "";
      option1_picture = 0;
      tag = "Quilt Blanket";
      image = $(".VueCarousel-inner").find("img").attr("src");
      console.log(image);
      images = [];
      images.push(image);
      optionvalu = $("#product-variants").find("button");
      console.log(optionvalu);
      if (optionvalu.length > 3) {
        sizelist = ["THROW", "TWIN", "QUEEN", "KING", "CALIFORNIA KING"];
        pricelist = ["47.95", "57.95", "67.95", "77.95", "87.95"];
      } else {
        sizelist = ["SMALL", "MEDIUM", "LARGE"];
        pricelist = ["37.95", "47.95", "65.95"];
      }

      var i;
      variant = "";
      for (i = 0; i < sizelist.length; i++) {
        variant = {
          sku: variant.sku,
          image: images[0],
          option1: sizelist[i],
          option2: "",
          origin_price: true,
          price: pricelist[i],
          cost: pricelist[i],
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      }

      product = {};
      product["store"] = true;
      product["title"] = title;
      product["product_type"] =
        product_type != undefined ? product_type : "Quilt Blanket";
      product["gender"] = "All";
      product["vender"] = "palmyhomey";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = idsp;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "palmyhomey");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      $(".collection-product-wrap").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".collection-product-wrap").length - 1) {
            setTimeout(function () {
              var url_string = window.location.href;
              var page = get("page");
              next_page = parseInt(page) + 1;
              var url = url_string.replace("page=" + page, "page=" + next_page);
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = "https://palmyhomey.com";
          url += $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

//epic
else if (
  window.location.href.indexOf("https://www.epic-hoodie.myshopify.com") > -1 ||
  window.location.href.indexOf("https://epic-hoodie.myshopify.com") > -1
) {
  if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      console.log("tesstttt");
      productid0 = $("#__st").text();
      productid1 = productid0.replace("var __st=", "").slice(0, -1);
      productidjson = JSON.parse(productid1);
      //console.log(productidjson);
      //console.log(productidjson.rid);

      content = $("body").html();

      chuoi =
        `new Shopify.OptionSelectors("product-select-` +
        productidjson.rid +
        `", { product: `;

      //console.log(chuoi);
      content1 = content.split(chuoi);
      //console.log(content1[1]);

      content2 = content1[1].split(", onVariantSelected:");
      content3 = content2[0];

      data = JSON.parse(content3);
      console.log(data);

      description = data.description;
      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "epichoodie";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      console.log(JSON.stringify(product));
      send(product, "epichoodie");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".prod-image").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".prod-image").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            url = $(item).find("a").attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

// https://sportselling.com/
else if (
  window.location.href.indexOf("https://www.sportselling.com") > -1 ||
  window.location.href.indexOf("https://sportselling.com") > -1
) {
  if (
    window.location.href.indexOf("https://sportselling.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        console.log(parseFloat(variant.price / 100).toFixed(2) - 2);
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-Product";
      product["gender"] = "All";
      product["vender"] = "hiep";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "hiep");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    console.log("pageeeeeeeeee");
    $(window).ready(function () {
      $(".grid__item.small--one-half").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".grid__item.small--one-half").length - 1) {
            setTimeout(function () {
              var url_string = window.location.href;
              var page = get("page");
              next_page = parseInt(page) + 1;
              var url = url_string.replace("page=" + page, "page=" + next_page);
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = "https://sportselling.com";
          url += $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  } else {
    window.close();
  }
}

//https://www.costco.com
else if (
  window.location.href.indexOf("https://www.chinabrands.com") > -1 ||
  window.location.href.indexOf("https://chinabrands.com") > -1
) {
  if (window.location.href.indexOf("/item/") > -1) {
    $(window).ready(function () {
      console.log("tesstttt");
      scProdId = $(".js_dataExport_single").attr("data-order");
      console.log(scProdId);
      variants = [];
      tags = "";
      images = [];

      setTimeout(function () {
        description = $(".j_detailPDMData").html();

        var crumb = $("#crumbs_ul li");
        var item = crumb[crumb.length - 1];
        console.log(item);
        product_type = item.textContent.trim();
        console.log(product_type);
        imagelist = $("#RICHFXViewerContainer___richfx_id_0 img").each(
          function (key, item) {
            let aaaa = $(item).attr("src");
            if (aaaa.indexOf("video") > -1) {
              console.log("video");
            } else {
              console.log("........................#########");

              console.log(aaaa);
              images.push(aaaa);
            }
          }
        );

        console.log(images);
        tag = null;

        // price = $('.pull-right>.value').text();
        // console.log(price);

        option1_picture = 0;

        let html = $("body").html();
        let scriptText = html.split("// <![CDATA[");
        let scriptText2 = scriptText[1].split("// ]]>");
        //console.log(scriptText2[0]);
        let producttext = scriptText2[0].split("var products =");
        let productsok = producttext[1].split("var options =");
        let productjson = productsok[0];
        // console.log(productjson);
        let productjsons = productjson.substring(0, productjson.length - 4);
        //console.log(productjsons);
        data = JSON.parse(productjsons);
        console.log("data", data);
        //console.log('option1');
        let productoptions = productsok[1];
        let jsonoption = productoptions.substring(0, productsok[1].length - 2);
        console.log("jsonoption", jsonoption);
        console.log("asdasdsad");
        let formatoption = jsonoption.replace(/'/g, '"');
        let dataoptions = JSON.parse(formatoption);
        console.log("hello");
        console.log("asd", dataoptions);

        if (dataoptions[0].length == 0) {
          console.log("Khong co options");
          console.log(atob(data[0][0].price));
          variant = {
            sku: null,
            image: images[0],
            option1: null,
            option2: null,
            // 'origin_price' : f,
            price: atob(data[0][0].price),
            cost: atob(data[0][0].price),
            shipping_cost: 0,
            quantity: 9999,
          };
          variants.push(variant);
          console.log(variants);

          product = {};
          product["store"] = true;
          product["title"] = data[0][0].productName;
          product["product_type"] =
            product_type != undefined ? product_type : "Manta-product";
          product["gender"] = "All";
          product["vender"] = "costco";
          product["vender_url"] = window.location.href;
          product["description"] = description;
          product["images"] = images;
          product["variants"] = variants;
          product["designed"] = -1;
          product["trending"] = trending === true ? 1 : 0;
          product["feedback"] = null;
          product["tags"] = tags;
          product["rank"] = null;
          product["vender_id"] = scProdId != undefined ? scProdId : null;
          product["specifics"] = null;
          product["option1_name"] = null;
          product["option2_name"] = null;
          product["option1_picture"] = 0;
          //console.log(JSON.stringify(product));
          send(product, "costco");
        } else if (dataoptions[0].length > 1) {
          console.log(">2 option");
          console.log(dataoptions[0][0]);
          option1_name = dataoptions[0][1].n; //size
          option2_name = dataoptions[0][0].n;
          console.log("so varians");
          console.log(data[0].length);
          data[0].forEach(function (variant, variant_key) {
            let bien0 = variant.options[0];
            let bien1 = variant.options[1];
            console.log("bien0");
            console.log(bien0);
            console.log("bien1");
            console.log(bien1);
            let optionbien1 = dataoptions[0][1].v;
            databien1 = "";
            for (let key of Object.keys(optionbien1)) {
              //console.log(optionbien1[key]);
              if (key == bien1) {
                databien1 = optionbien1[key];
              }
            }
            let optionbien2 = dataoptions[0][0].v;
            databien2 = "";
            for (let key2 of Object.keys(optionbien2)) {
              //console.log(optionbien1[key]);
              if (key2 == bien0) {
                databien2 = optionbien2[key2];
              }
            }

            console.log(databien1);
            console.log(databien2);
            variant = {
              sku: null,
              image:
                variant.parent_img_url != null
                  ? variant.parent_img_url
                  : images[0],
              option1: databien1,
              option2: databien2,
              // 'origin_price' : true,
              price: atob(variant.price),
              cost: atob(variant.price),
              shipping_cost: 0,
              quantity: 9999,
            };
            variants.push(variant);
          });
          console.log(variants);
          product = {};
          product["store"] = true;
          product["title"] = data[0][0].productName;
          product["product_type"] =
            product_type != undefined ? product_type : "Manta-product";
          product["gender"] = "All";
          product["vender"] = "costco";
          product["vender_url"] = window.location.href;
          product["description"] = description;
          product["images"] = images;
          product["variants"] = variants;
          product["designed"] = -1;
          product["trending"] = trending === true ? 1 : 0;
          product["feedback"] = null;
          product["tags"] = tags;
          product["rank"] = null;
          product["vender_id"] = scProdId != undefined ? scProdId : null;
          product["specifics"] = null;
          product["option1_name"] = option1_name;
          product["option2_name"] = option2_name;
          product["option1_picture"] = 0;
          //console.log(JSON.stringify(product));
          send(product, "costco");
        } else if (dataoptions[0].length == 1) {
          console.log("1 options");
          console.log(dataoptions[0][0]);
          option1_name = dataoptions[0][0].n; //size

          console.log("so varians");
          console.log(data[0].length);
          data[0].forEach(function (variant, variant_key) {
            let bien0 = variant.options[0];

            console.log("bien0");
            console.log(bien0);

            let optionbien2 = dataoptions[0][0].v;
            databien2 = "";
            for (let key2 of Object.keys(optionbien2)) {
              //console.log(optionbien1[key]);
              if (key2 == bien0) {
                databien2 = optionbien2[key2];
              }
            }

            console.log(databien2);
            variant = {
              sku: null,
              image:
                variant.parent_img_url != null
                  ? variant.parent_img_url
                  : images[0],
              option1: databien2,
              option2: null,
              // 'origin_price' : true,
              price: atob(variant.price),
              cost: atob(variant.price),
              shipping_cost: 0,
              quantity: 9999,
            };
            variants.push(variant);
          });
          console.log(variants);
          product = {};
          product["store"] = true;
          product["title"] = data[0][0].productName;
          product["product_type"] =
            product_type != undefined ? product_type : "Manta-product";
          product["gender"] = "All";
          product["vender"] = "costco";
          product["vender_url"] = window.location.href;
          product["description"] = description;
          product["images"] = images;
          product["variants"] = variants;
          product["designed"] = -1;
          product["trending"] = trending === true ? 1 : 0;
          product["feedback"] = null;
          product["tags"] = tags;
          product["rank"] = null;
          product["vender_id"] = scProdId != undefined ? scProdId : null;
          product["specifics"] = null;
          product["option1_name"] = option1_name;
          product["option2_name"] = null;
          product["option1_picture"] = 0;
          console.log(JSON.stringify(product));
          send(product, "costco");
        }
      }, 2000);
    });
  } else if (window.location.href.indexOf("costco.com") > -1) {
    console.log("get product link");
    $(window).ready(function () {
      $(".product-tile-set").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".product-tile-set").length - 1) {
            console.log("OK");
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          url = $(item).attr("data-pdp-url");
          window.open(url, "_blank");
        }
      });
    });
  }
}

//discounteyez.com
else if (
  window.location.href.indexOf("https://www.discounteyez.com") > -1 ||
  window.location.href.indexOf("https://discounteyez.com") > -1
) {
  if (
    window.location.href.indexOf("https://discounteyez.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "discounteyez";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "discounteyez");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".product-grid-item").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".product-grid-item").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://discounteyez.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

//landsuce.myshopify.com
else if (
  window.location.href.indexOf("https://www.landsuce.myshopify.com") > -1 ||
  window.location.href.indexOf("https://landsuce.myshopify.com") > -1
) {
  if (
    window.location.href.indexOf(
      "https://landsuce.myshopify.com/#MainContent"
    ) > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data1 = JSON.parse($("#ProductJson-product-template").text());
      data = JSON.parse(data1.product);
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "landsuce";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "landsuce");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid-view-item__link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-view-item__link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://landsuce.myshopify.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

//https://homelulus.com/collections/all
else if (
  window.location.href.indexOf("https://www.homelulus.com") > -1 ||
  window.location.href.indexOf("https://homelulus.com") > -1
) {
  if (window.location.href.indexOf("https://homelulus.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["product_type"] = "Manta-product";
      product["gender"] = "All";
      product["vender"] = "homelulus";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "homelulus");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid__image").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid__image").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://homelulus.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

//https://goodiegets.com/collections/all
else if (
  window.location.href.indexOf("https://www.goodiegets.com") > -1 ||
  window.location.href.indexOf("https://goodiegets.com") > -1
) {
  if (
    window.location.href.indexOf("https://goodiegets.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-product";
      product["gender"] = "All";
      product["vender"] = "goodiegets";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "goodiegets");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid-view-item__link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-view-item__link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://goodiegets.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

//https://8xgear.com/collections/all
else if (
  window.location.href.indexOf("https://www.8xgear.com") > -1 ||
  window.location.href.indexOf("https://8xgear.com") > -1
) {
  if (window.location.href.indexOf("https://8xgear.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      // product['product_type'] = (product_type != undefined ? product_type : 'Manta-product');
      product["gender"] = "All";
      product["vender"] = "8xgear";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      product["product_type"] = 312;
      product["delivery_date_min"] = 7;
      product["delivery_date_max"] = 14;
      product["shipping_service_name"] = "Economy Shipping";
      product["location"] = "USA";
      //console.log(JSON.stringify(product));
      send(product, "8xgear");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid-view-item__link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-view-item__link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://8xgear.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

//https://shoes-customs.myshopify.com/collections/all
else if (
  window.location.href.indexOf("https://www.shoes-customs.myshopify.com") >
    -1 ||
  window.location.href.indexOf("https://shoes-customs.myshopify.com") > -1
) {
  if (
    window.location.href.indexOf(
      "https://shoes-customs.myshopify.com/#MainContent"
    ) > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 3,
          cost: parseFloat(variant.price / 100).toFixed(2) - 3,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      // product['product_type'] = (product_type != undefined ? product_type : 'Manta-product');
      product["gender"] = "All";
      product["vender"] = "shoes-customs";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      product["product_type"] = 312;
      product["delivery_date_min"] = 7;
      product["delivery_date_max"] = 14;
      product["shipping_service_name"] = "Economy Shipping";
      product["location"] = "USA";
      //console.log(JSON.stringify(product));
      send(product, "shoes-customs");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid-view-item__link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-view-item__link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://shoes-customs.myshopify.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

//$$('script[type="application/json"][data-product-json]')
//https://ourpetmarket.com/collections/all
else if (
  window.location.href.indexOf("https://www.ourpetmarket.com") > -1 ||
  window.location.href.indexOf("https://ourpetmarket.com") > -1
) {
  if (
    window.location.href.indexOf("https://ourpetmarket.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      cont = JSON.parse(
        $('script[type="application/json"][data-product-json]').text()
      );
      data = cont.product;

      console.log(cont.selected_variant_id);
      // console.log(data.description);

      // data = JSON.parse($('script[type="application/json"][data-product-json]').text());
      // console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 3,
          cost: parseFloat(variant.price / 100).toFixed(2) - 3,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      // product['product_type'] = (product_type != undefined ? product_type : 'Manta-product');
      product["gender"] = "All";
      product["vender"] = "ourpetmarket";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      product["product_type"] = 76546;
      product["delivery_date_min"] = 20;
      product["delivery_date_max"] = 30;
      product["shipping_service_name"] = "Economy Shipping";
      product["location"] = "USA";
      //console.log(JSON.stringify(product));
      send(product, "ourpetmarket");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid-view-item__link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-view-item__link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://ourpetmarket.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

//fdshfnbcv.myshopify.com
else if (
  window.location.href.indexOf("https://www.fdshfnbcv.myshopify.com") > -1 ||
  window.location.href.indexOf("https://fdshfnbcv.myshopify.com") > -1
) {
  if (
    window.location.href.indexOf(
      "https://fdshfnbcv.myshopify.com/#MainContent"
    ) > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($(".product-json").text());
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      // product['product_type'] = (product_type != undefined ? product_type : 'Manta-product');
      product["gender"] = "All";
      product["vender"] = "fdshfnbcv";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      product["product_type"] = 76546;
      product["delivery_date_min"] = 20;
      product["delivery_date_max"] = 30;
      product["shipping_service_name"] = "Economy Shipping";
      product["location"] = "USA";
      //console.log(JSON.stringify(product));
      send(product, "fdshfnbcv");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".prod-image").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".prod-image").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://fdshfnbcv.myshopify.com";
            url = url + $(item).find("a").attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

//superiorquilting.com
else if (
  window.location.href.indexOf("https://www.superiorquilting.com") > -1 ||
  window.location.href.indexOf("https://superiorquilting.com") > -1
) {
  if (
    window.location.href.indexOf("https://superiorquilting.com/#MainContent") >
    -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      // description = data.description;
      description = $(".product-single__description")
        .html()
        .replace(/display: none;/gi, "display: block");

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          // 'origin_price' : true,
          price: parseFloat(variant.price / 100).toFixed(2),
          cost: parseFloat(variant.price / 100).toFixed(2),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      // product['product_type'] = (product_type != undefined ? product_type : 'Manta-product');
      product["gender"] = "All";
      product["vender"] = "superiorquilting";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      product["product_type"] = 76546;
      product["delivery_date_min"] = 20;
      product["delivery_date_max"] = 30;
      product["shipping_service_name"] = "Economy Shipping";
      product["location"] = "USA";
      //console.log(JSON.stringify(product));
      send(product, "superiorquilting");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid-view-item__link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-view-item__link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://superiorquilting.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}
//coolwort.com
else if (
  window.location.href.indexOf("https://www.coolwort.com") > -1 ||
  window.location.href.indexOf("https://coolwort.com") > -1
) {
  if (window.location.href.indexOf("https://coolwort.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      // description = data.description;
      description = $(".product-single__description")
        .html()
        .replace(/display: none;/gi, "display: block");

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["gender"] = "All";
      product["vender"] = "coolwort";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      product["product_type"] = 76546;
      product["delivery_date_min"] = 20;
      product["delivery_date_max"] = 30;
      product["shipping_service_name"] = "Economy Shipping";
      product["location"] = "USA";
      //console.log(JSON.stringify(product));
      send(product, "coolwort");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".product-card").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".product-card").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://coolwort.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

//carthippo.com
else if (
  window.location.href.indexOf("https://www.carthippo.com") > -1 ||
  window.location.href.indexOf("https://carthippo.com") > -1
) {
  if (window.location.href.indexOf("https://carthippo.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      // description = data.description;
      description = $("#j-product-desc").html();

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        var iii = 1;
        variant = {
          sku: iii,
          image:
            "https:" +
            (variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0]),
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
        iii = iii + 1;
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["gender"] = "All";
      product["vender"] = "carthippo";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      product["product_type"] = 76546;
      product["delivery_date_min"] = 20;
      product["delivery_date_max"] = 30;
      product["shipping_service_name"] = "Economy Shipping";
      product["location"] = "USA";
      //console.log(JSON.stringify(product));
      send(product, "carthippo");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".product-grid-desc").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".product-grid-desc").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://carthippo.com";
            url = url + $(item).find("a").attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

//https://ourpetmarket.com/collections/all
else if (
  window.location.href.indexOf("https://www.fuclothes.com") > -1 ||
  window.location.href.indexOf("https://fuclothes.com") > -1
) {
  if (window.location.href.indexOf("https://fuclothes.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      cont = JSON.parse(
        $('script[type="application/json"][data-product-json]').text()
      );
      data = cont.product;

      console.log(cont.selected_variant_id);
      // console.log(data.description);

      // data = JSON.parse($('script[type="application/json"][data-product-json]').text());
      // console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 3,
          cost: parseFloat(variant.price / 100).toFixed(2) - 3,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      // product['product_type'] = (product_type != undefined ? product_type : 'Manta-product');
      product["gender"] = "All";
      product["vender"] = "fuclothes";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      product["product_type"] = 76546;
      product["delivery_date_min"] = 20;
      product["delivery_date_max"] = 30;
      product["shipping_service_name"] = "Economy Shipping";
      product["location"] = "USA";
      //console.log(JSON.stringify(product));
      send(product, "fuclothes");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".ProductItem__ImageWrapper--withAlternateImage").each(function (
          key,
          item
        ) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (
              key ==
              $(".ProductItem__ImageWrapper--withAlternateImage").length - 1
            ) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://fuclothes.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

//https://ecomupdatemine.com/collec
else if (
  window.location.href.indexOf("https://www.ecomupdatemine.com") > -1 ||
  window.location.href.indexOf("https://ecomupdatemine.com") > -1
) {
  if (
    window.location.href.indexOf("https://ecomupdatemine.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      idsp = $("#shopify-product-reviews").attr("data-id");
      console.log(idsp);
      let text = "#product-form-" + idsp;

      let sc = $(text).attr("data-product");

      if (!sc.length) {
        window.close();
      }

      //console.log(sc);

      data = JSON.parse(sc);
      //console.log(data);
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      // product['product_type'] = (product_type != undefined ? product_type : 'Manta-product');
      product["gender"] = "All";
      product["vender"] = "ecomupdatemine";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      product["product_type"] = 76546;
      product["delivery_date_min"] = 20;
      product["delivery_date_max"] = 30;
      product["shipping_service_name"] = "Economy Shipping";
      product["location"] = "USA";
      //console.log(JSON.stringify(product));
      send(product, "ecomupdatemine");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".hidden-product-link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".hidden-product-link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://ecomupdatemine.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

//https://gearteely.com/collec
else if (
  window.location.href.indexOf("https://www.gearteely.com") > -1 ||
  window.location.href.indexOf("https://gearteely.com") > -1
) {
  if (window.location.href.indexOf("https://gearteely.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      idsp = $(".jdgm-widget.jdgm-preview-badge.mb16").attr("data-id");
      console.log(idsp);
      let myJson = "";
      let linkapi =
        "https://api.boostflow.com/v1/product/products.json?ref_id=" +
        idsp +
        "&api_key=180a3279aabb6db392055d86064436ad";
      fetch(linkapi)
        .then((response) => response.json())
        .then((reseponse) => {
          let data = reseponse[0];
          //console.log(JSON.stringify(data));
          description = data.description;
          console.log(data.variant_options.length);

          variants = [];
          tags = "";
          product_type = data.type != "" ? data.type : data.tags[0];
          if (data.variant_options.length <= 2) {
            option1_name =
              data.variant_options[0].name != undefined
                ? data.variant_options[0].name
                : "";
            try {
              option2_name =
                data.variant_options[1].name != undefined
                  ? data.variant_options[1].name
                  : "";
            } catch (err) {
              option2_name = "";
            }

            option1_picture = 0;
            tag = data.tags;
            imagess = [];
            data.images.forEach(function (image, image_key) {
              data.images[image_key] = "https:" + image;
              imagess.push(image.src);
            });
            data.variants.forEach(function (variant, variant_key) {
              console.log(variant.image_url);
              if (variant.featured_image != null) option1_picture = 1;
              variant = {
                sku: variant.sku,
                image:
                  variant.image_url != null
                    ? variant.image_url
                    : data.imagess[0],
                option1: variant.option1,
                option2: variant.option2,
                origin_price: true,
                price: variant.price - 2,
                cost: variant.price - 2,
                shipping_cost: 0,
                quantity: 9999,
              };
              variants.push(variant);
            });
          } else {
            option1_name =
              data.variant_options[1].name != undefined
                ? data.variant_options[1].name
                : "";

            try {
              option2_name =
                data.variant_options[2].name != undefined
                  ? data.variant_options[2].name
                  : "";
            } catch (err) {
              option2_name = "";
            }
            option1_picture = 0;
            tag = data.tags;
            imagess = [];
            data.images.forEach(function (image, image_key) {
              data.images[image_key] = "https:" + image;
              imagess.push(image.src);
            });
            data.variants.forEach(function (variant, variant_key) {
              console.log(variant.image_url);
              if (variant.featured_image != null) option1_picture = 1;
              variant = {
                sku: variant.sku,
                image:
                  variant.image_url != null
                    ? variant.image_url
                    : data.imagess[0],
                option1: variant.option2,
                option2: variant.option3,
                origin_price: true,
                price: variant.price - 2,
                cost: variant.price - 2,
                shipping_cost: 0,
                quantity: 9999,
              };
              variants.push(variant);
            });
          }

          product = {};
          product["store"] = true;
          product["title"] = data.title;
          // product['product_type'] = (product_type != undefined ? product_type : 'Manta-product');
          product["gender"] = "All";
          product["vender"] = "gearteely";
          product["vender_url"] = window.location.href;
          product["description"] =
            description != undefined ? description : data.content;
          product["images"] = imagess;
          product["variants"] = variants;
          product["designed"] = -1;
          product["trending"] = trending === true ? 1 : 0;
          product["feedback"] = null;
          product["tags"] = tags;
          product["rank"] = null;
          product["vender_id"] = idsp;
          product["specifics"] = null;
          product["option1_name"] = option1_name;
          product["option2_name"] = option2_name;
          product["option1_picture"] = option1_picture;
          product["product_type"] = 312;
          product["delivery_date_min"] = 10;
          product["delivery_date_max"] = 17;
          product["shipping_service_name"] = "Economy Shipping";
          product["location"] = "USA";
          console.log(JSON.stringify(product));
          send(product, "gearteely");
        });
    });

    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open( "GET", linkapi, false ); // false for synchronous request
    // xmlHttp.send( null );

    // //console.log(xmlHttp.responseText);

    // data1 = JSON.parse(xmlHttp.responseText);
    // console.log("data là");
    // let data = data1[0]
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".collection-product-wrap").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".collection-product-wrap").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 7000 * key);

          function get_shirt99(key, item) {
            var url = "https://gearteely.com";
            url = url + $(item).find("a").attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

// https://shoesmark.com.com.com
else if (
  window.location.href.indexOf("https://buzzazone.com") > -1 ||
  window.location.href.indexOf("https://www.buzzazone.com") > -1
) {
  console.log("sport");
  if (window.location.href.indexOf("https://buzzazone.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/product/") > -1) {
    $(window).ready(function () {
      console.log("GETTTT");
      data = JSON.parse($(".variations_form ").attr("data-product_variations"));
      console.log(JSON.stringify(data));
      description = $(".woocommerce-product-details__short-description").html();
      //description = null;
      product_type = data.type != "" ? data.type : data.tags[0];
      tags = "";
      images = [];
      content = $("head").html();
      content1 = content.split('"tags":"');
      if (content1[1] != undefined) {
        content2 = content1[1].split('"}');
        tags = content2[0].trim();
      }
      console.log(tags);
      $(".woocommerce-product-gallery__image--placeholder").each(function (
        image_key,
        image
      ) {
        images[image_key] = $(image).find("img").attr("src");
      });
      variants = [];

      // console.log(images);

      option1_name = "Style";
      option2_name = "Size";
      option1_picture = 0;
      // if(variant.image.full_src != null) {
      // 	variant.image.full_src
      // } else {
      // 	images[0]
      // }
      data.forEach(function (variant, variant_key) {
        variant = {
          sku: variant.sku,
          image:
            variant.image.full_src != null ? variant.image.full_src : images[0],
          option1:
            variant.attributes.attribute_style != undefined
              ? variant.attributes.attribute_style
              : variant.attributes.attribute_color != undefined
              ? variant.attributes.attribute_color
              : "Crystal Clear",
          option2:
            variant.attributes.attribute_size != undefined
              ? variant.attributes.attribute_size
              : "One Size",
          origin_price: true,
          price: parseFloat(variant.display_price) - 2,
          cost: parseFloat(variant.display_price) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });
      //console.log(variants);
      product = {};
      product["store"] = true;
      product["title"] = $(".product_title").text();
      product["product_type"] = "shoes";
      product["gender"] = "All";
      product["vender"] = "shoesmark";
      product["vender_url"] = window.location.href;
      product["description"] = description != undefined ? description : null;
      product["images"] = images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = $(".variations_form ").attr("data-product_id");
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      //send(product,'shoesmark');
    });
  } else if (window.location.href.indexOf("/page/") > -1) {
    console.log("get product link");
    $(window).ready(function () {
      $(".image-fade_in_back").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".image-fade_in_back").length - 1) {
            setTimeout(function () {
              page = $(".page-numbers .current").text();
              console.log(page);
              next_page = parseInt(page) + 1;
              var url_string = window.location.href;
              var url = url_string.replace(
                "/page/" + page,
                "/page/" + next_page
              );
              window.location.href = url;
            }, 10000);
          }
        }, 12000 * key);

        function get_shirt99(key, item) {
          url = $(item).find("a").attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

//lucysstyle.com
else if (
  window.location.href.indexOf("https://www.lucysstyle.com") > -1 ||
  window.location.href.indexOf("https://lucysstyle.com") > -1
) {
  if (
    window.location.href.indexOf("https://lucysstyle.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = "";
      //data = JSON.parse($('#ProductJson-product-template').text());
      if ($("#ProductJson-product-template").length != 0) {
        console.log($("#ProductJson-product-template").length);
        data = JSON.parse($("#ProductJson-product-template").text().trim());
      } else {
        data = JSON.parse(
          $("#ProductJson-product-picandname-template").text().trim()
        );
      }
      // description = data.description;
      description = $(".product-single__description").html();

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      // product['product_type'] = (product_type != undefined ? product_type : 'Manta-product');
      product["gender"] = "All";
      product["vender"] = "lucysstyle";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      product["product_type"] = 312;
      product["delivery_date_min"] = 10;
      product["delivery_date_max"] = 25;
      product["shipping_service_name"] = "Economy Shipping";
      product["location"] = "USA";
      //console.log(JSON.stringify(product));
      send(product, "lucysstyle");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        if ($(".on-sale").length > 0) {
          $(".on-sale").each(function (key, item) {
            setTimeout(function () {
              console.log(key);
              get_shirt99(key, item);

              if (key == $(".on-sale").length - 1) {
                setTimeout(function () {
                  var url_string = window.location.href;
                  var page = get("page");
                  next_page = parseInt(page) + 1;
                  var url = url_string.replace(
                    "page=" + page,
                    "page=" + next_page
                  );
                  window.location.href = url;
                }, 10000);
              }
            }, 10000 * key);

            function get_shirt99(key, item) {
              var url = "https://lucysstyle.com";
              url = url + $(item).find("a").attr("href");
              window.open(url, "_blank");
            }
          });
        } else {
          console.log("next");
          setTimeout(function () {
            var url_string = window.location.href;
            var page = get("page");
            next_page = parseInt(page) + 1;
            var url = url_string.replace("page=" + page, "page=" + next_page);
            window.location.href = url;
          }, 10000);
        }
      }, 2000);
    });
  }
}

//https:///yes-my-running-shoes.myshopify.com
else if (
  window.location.href.indexOf(
    "https://www.yes-my-running-shoes.myshopify.com"
  ) > -1 ||
  window.location.href.indexOf("https://yes-my-running-shoes.myshopify.com") >
    -1
) {
  if (
    window.location.href.indexOf(
      "https://yes-my-running-shoes.myshopify.com/#MainContent"
    ) > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 5,
          cost: parseFloat(variant.price / 100).toFixed(2) - 5,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      // product['product_type'] = (product_type != undefined ? product_type : 'Manta-product');
      product["gender"] = "All";
      product["vender"] = "yesmyrunningshoes";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      product["product_type"] = 312;
      product["delivery_date_min"] = 10;
      product["delivery_date_max"] = 17;
      product["shipping_service_name"] = "Economy Shipping";
      product["location"] = "USA";
      //console.log(JSON.stringify(product));
      send(product, "yesmyrunningshoes");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid-view-item__link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-view-item__link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://yes-my-running-shoes.myshopify.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

//https:///wowkiks.com
else if (
  window.location.href.indexOf("https://www.wowkiks.com") > -1 ||
  window.location.href.indexOf("https://wowkiks.com") > -1
) {
  if (window.location.href.indexOf("https://wowkiks.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      productid0 = $("#__st").text();
      productid1 = productid0.replace("var __st=", "").slice(0, -1);
      productidjson = JSON.parse(productid1);
      idsp = productidjson.rid;

      idprodcut = "#product-form-" + idsp;
      console.log(idprodcut);
      data = JSON.parse($(idprodcut).attr("data-product"));
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      // product['product_type'] = (product_type != undefined ? product_type : 'Manta-product');
      product["gender"] = "All";
      product["vender"] = "wowkiks";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      product["product_type"] = 312;
      product["delivery_date_min"] = 10;
      product["delivery_date_max"] = 17;
      product["shipping_service_name"] = "Economy Shipping";
      product["location"] = "USA";
      //console.log(JSON.stringify(product));
      send(product, "wowkiks");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid-view-item__link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-view-item__link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://wowkiks.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

//https://chavelary.com/collec
else if (
  window.location.href.indexOf("https://www.chavelary.com") > -1 ||
  window.location.href.indexOf("https://chavelary.com") > -1
) {
  if (window.location.href.indexOf("/shop?") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".ProductItemInner").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".ProductItemInner").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://chavelary.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  } else if (window.location.href.indexOf("com/") > -1) {
    $(window).ready(function () {
      dataidsp = JSON.parse(
        document.querySelector('script[type="application/ld+json"]').innerText
      );
      product_id = dataidsp.productID;
      console.log(product_id);
      let myJson = "";
      let linkapi =
        "https://chavelary.com/api/product/products/" +
        product_id +
        "/options?v=";
      fetch(linkapi)
        .then((response) => response.json())
        .then((reseponse) => {
          let data = reseponse;
          //console.log(JSON.stringify(data));
          description = "";

          variants = [];
          tags = "";

          option1_name =
            data.data.attributes[0].name != undefined
              ? data.data.attributes[0].name
              : "";
          try {
            option2_name =
              data.data.attributes[1].name != undefined
                ? data.data.attributes[1].name
                : "";
          } catch (err) {
            option2_name = "";
          }

          option1_picture = 0;
          tag = data.tags;
          imagess = [];
          $(".img-fluid").each(function (key, item) {
            imagess.push($(item).attr("src"));
          });
          console.log(imagess);
          data.data.variants.forEach(function (variant, variant_key) {
            //console.log(variant.options[1].slug);
            if (variant.featured_image != null) option1_picture = 1;
            variant = {
              sku: variant._id,
              image: variant.image_url != null ? variant.image_url : imagess[0],
              option1: variant.options[0].slug,
              option2: variant.options[1] ? variant.options[1].slug : "",
              origin_price: true,
              price: variant.retail_price - 2,
              cost: variant.retail_price - 2,
              shipping_cost: 0,
              quantity: 9999,
            };
            variants.push(variant);
          });

          product = {};
          product["store"] = true;
          product["title"] = $(".ProductTitle").text();
          // product['product_type'] = (product_type != undefined ? product_type : 'Manta-product');
          product["gender"] = "All";
          product["vender"] = "chavelary";
          product["vender_url"] = window.location.href;
          product["description"] =
            description != undefined ? description : data.content;
          product["images"] = imagess;
          product["variants"] = variants;
          product["designed"] = -1;
          product["trending"] = trending === true ? 1 : 0;
          product["feedback"] = null;
          product["tags"] = tags;
          product["rank"] = null;
          product["vender_id"] = product_id;
          product["specifics"] = null;
          product["option1_name"] = option1_name;
          product["option2_name"] = option2_name;
          product["option1_picture"] = option1_picture;
          product["product_type"] = 312;
          product["delivery_date_min"] = 10;
          product["delivery_date_max"] = 17;
          product["shipping_service_name"] = "Economy Shipping";
          product["location"] = "USA";
          //console.log(JSON.stringify(product));
          send(product, "chavelary");
        });
    });
  }
}

//https:///yes-my-running-shoes.myshopify.com
else if (
  window.location.href.indexOf("https://www.sexybeastsupply.com") > -1 ||
  window.location.href.indexOf("https://sexybeastsupply.com") > -1
) {
  if (
    window.location.href.indexOf("https://sexybeastsupply.com/#MainContent") >
    -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 5,
          cost: parseFloat(variant.price / 100).toFixed(2) - 5,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      // product['product_type'] = (product_type != undefined ? product_type : 'Manta-product');
      product["gender"] = "All";
      product["vender"] = "sexybeastsupply";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      product["product_type"] = 312;
      product["delivery_date_min"] = 10;
      product["delivery_date_max"] = 17;
      product["shipping_service_name"] = "Economy Shipping";
      product["location"] = "USA";
      //console.log(JSON.stringify(product));
      send(product, "sexybeastsupply");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".grid-product__image-link").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".grid-product__image-link").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://sexybeastsupply.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}

//https://gearzipy.com/
else if (
  window.location.href.indexOf("https://www.gearzipy.com") > -1 ||
  window.location.href.indexOf("https://gearzipy.com") > -1
) {
  if (window.location.href.indexOf("?page=") > -1) {
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".ProductItemInner").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".ProductItemInner").length - 1) {
              setTimeout(function () {
                var url_string = window.location.href;
                var page = get("page");
                next_page = parseInt(page) + 1;
                var url = url_string.replace(
                  "page=" + page,
                  "page=" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 5000 * key);

          function get_shirt99(key, item) {
            var url = "https://gearzipy.com";
            url = url + $(item).attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  } else if (window.location.href.indexOf("com/") > -1) {
    $(window).ready(function () {
      dataidsp = JSON.parse(
        document.querySelector('script[type="application/ld+json"]').innerText
      );
      product_id = dataidsp.productID;
      console.log(product_id);
      let myJson = "";
      let linkapi =
        "https://gearzipy.com/api/product/products/" +
        product_id +
        "/options?v=";
      fetch(linkapi)
        .then((response) => response.json())
        .then((reseponse) => {
          let data = reseponse;
          //console.log(JSON.stringify(data));
          description = "";

          variants = [];
          tags = "";

          option1_name =
            data.data.attributes[0].name != undefined
              ? data.data.attributes[0].name
              : "";
          try {
            option2_name =
              data.data.attributes[1].name != undefined
                ? data.data.attributes[1].name
                : "";
          } catch (err) {
            option2_name = "";
          }

          option1_picture = 0;
          tag = data.tags;
          imagess = [];
          $(".img-fluid").each(function (key, item) {
            imagess.push($(item).attr("src"));
          });
          console.log(imagess);
          data.data.variants.forEach(function (variant, variant_key) {
            //console.log(variant.options[1].slug);
            if (variant.featured_image != null) option1_picture = 1;
            variant = {
              sku: variant._id,
              image: variant.image_url != null ? variant.image_url : imagess[0],
              option1: variant.options[0].slug,
              option2: variant.options[1] ? variant.options[1].slug : "",
              origin_price: true,
              price: variant.retail_price - 2,
              cost: variant.retail_price - 2,
              shipping_cost: 0,
              quantity: 9999,
            };
            variants.push(variant);
          });

          product = {};
          product["store"] = true;
          product["title"] = $(".ProductTitle").text();
          // product['product_type'] = (product_type != undefined ? product_type : 'Manta-product');
          product["gender"] = "All";
          product["vender"] = "gearzipy";
          product["vender_url"] = window.location.href;
          product["description"] =
            description != undefined ? description : data.content;
          product["images"] = imagess;
          product["variants"] = variants;
          product["designed"] = -1;
          product["trending"] = trending === true ? 1 : 0;
          product["feedback"] = null;
          product["tags"] = tags;
          product["rank"] = null;
          product["vender_id"] = product_id;
          product["specifics"] = null;
          product["option1_name"] = option1_name;
          product["option2_name"] = option2_name;
          product["option1_picture"] = option1_picture;
          product["product_type"] = 312;
          product["delivery_date_min"] = 10;
          product["delivery_date_max"] = 17;
          product["shipping_service_name"] = "Economy Shipping";
          product["location"] = "USA";
          //console.log(JSON.stringify(product));
          send(product, "gearzipy");
        });
    });
  }
}

// writetee
else if (window.location.href.indexOf("writetee.shop") > -1) {
  if (window.location.href.indexOf("/product/") > -1) {
    console.log("okokokokokoko");
    $(window).ready(function () {
      (async () => {
        await timeout(3000);
        description = $("#tab-description").html();
        variants = [];
        tags = $('input[name$="gtm4wp_category"]').val();
        images = [];
        $(".flickity-slider .woocommerce-product-gallery__image").each(
          function (index) {
            images[index] = $(this).find("img").attr("src");
          }
        );

        option1 = "Crystal Clear";
        option2 = "One Size";
        price = parseFloat($('input[name$="gtm4wp_price"]').val()) - 2;

        const data_get_variants_wordpress = await get_variants_wordpress(
          images,
          price
        );
        variants = data_get_variants_wordpress.variants;
        option1_name = data_get_variants_wordpress.option1_name;
        option2_name = data_get_variants_wordpress.option2_name;
        console.log(data_get_variants_wordpress);
        console.log("dang doi 30s");
        await timeout(2000);
        console.log("dang doi");
        product = {};
        product["store"] = true;
        product["title"] = $('input[name$="gtm4wp_name"]').val();
        product["product_type"] = 51239;
        product["gender"] = "All";
        product["vender"] = "writetee";
        product["vender_url"] = window.location.href;
        product["description"] = description;
        product["images"] = images;
        product["variants"] = variants;
        product["designed"] = -1;
        product["trending"] = trending === true ? 1 : 0;
        product["feedback"] = null;
        product["tags"] = tags;
        product["rank"] = null;
        product["delivery_date_min"] = 20;
        product["delivery_date_max"] = 45;
        product["option1_name"] = option1_name;
        product["option2_name"] = option2_name;
        product["option1_picture"] = 0;
        product["shipping_service_name"] = "Economy Shipping";
        product["location"] = "USA";
        product["vender_id"] =
          $('input[name$="gtm4wp_sku"]').length > 0
            ? $('input[name$="gtm4wp_sku"]').val()
            : Math.round(Math.random() * 1000000);
        console.log(product);
        send(product, "writetee");
      })();
    });
  } else if (window.location.href.indexOf("/product-category/") > -1) {
    console.log("get pagessss");
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".image-fade_in_back").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".image-fade_in_back").length - 1) {
              setTimeout(function () {
                page = $(".page-numbers .current").text();
                next_page = parseInt(page) + 1;
                var url_string = window.location.href;
                var url = url_string.replace(
                  "/page/" + page,
                  "/page/" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 15000 * key);

          function get_shirt99(key, item) {
            //var url = 'https://writetee.shop';
            url = $(item).find("a").attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
} else if (window.location.href.indexOf("bytetee.shop") > -1) {
  if (window.location.href.indexOf("/product/") > -1) {
    console.log("okokokokokoko");
    $(window).ready(function () {
      (async () => {
        await timeout(3000);
        description = $("#tab-description").html();
        variants = [];
        tags = $('input[name$="gtm4wp_category"]').val();
        images = [];
        $(".flickity-slider .woocommerce-product-gallery__image").each(
          function (index) {
            images[index] = $(this).find("img").attr("src");
          }
        );

        option1 = "Crystal Clear";
        option2 = "One Size";
        price = parseFloat($('input[name$="gtm4wp_price"]').val()) - 2;

        const data_get_variants_wordpress = await get_variants_wordpress(
          images,
          price
        );
        variants = data_get_variants_wordpress.variants;
        option1_name = data_get_variants_wordpress.option1_name;
        option2_name = data_get_variants_wordpress.option2_name;
        console.log(data_get_variants_wordpress);
        console.log("dang doi 30s");
        await timeout(2000);
        console.log("dang doi");
        product = {};
        product["store"] = true;
        product["title"] = $('input[name$="gtm4wp_name"]').val();
        product["product_type"] = 51239;
        product["gender"] = "All";
        product["vender"] = "writetee";
        product["vender_url"] = window.location.href;
        product["description"] = description;
        product["images"] = images;
        product["variants"] = variants;
        product["designed"] = -1;
        product["trending"] = trending === true ? 1 : 0;
        product["feedback"] = null;
        product["tags"] = tags;
        product["rank"] = null;
        product["delivery_date_min"] = 20;
        product["delivery_date_max"] = 45;
        product["option1_name"] = option1_name;
        product["option2_name"] = option2_name;
        product["option1_picture"] = 0;
        product["shipping_service_name"] = "Economy Shipping";
        product["location"] = "USA";
        product["vender_id"] =
          $('input[name$="gtm4wp_sku"]').length > 0
            ? $('input[name$="gtm4wp_sku"]').val()
            : Math.round(Math.random() * 1000000);
        console.log(product);
        send(product, "bytetee");
      })();
    });
  } else if (window.location.href.indexOf("/product-category/") > -1) {
    console.log("get pagessss");
    $(window).ready(function () {
      console.log("bung link");
      setTimeout(function () {
        $(".image-fade_in_back").each(function (key, item) {
          setTimeout(function () {
            console.log(key);
            get_shirt99(key, item);

            if (key == $(".image-fade_in_back").length - 1) {
              setTimeout(function () {
                page = $(".page-numbers .current")[0].text();
                next_page = parseInt(page) + 1;
                var url_string = window.location.href;
                var url = url_string.replace(
                  "/page/" + page,
                  "/page/" + next_page
                );
                window.location.href = url;
              }, 10000);
            }
          }, 10000 * key);

          function get_shirt99(key, item) {
            url = $(item).find("a").attr("href");
            window.open(url, "_blank");
          }
        });
      }, 2000);
    });
  }
}
// https://shoeworld.us.com.com.com
else if (
  window.location.href.indexOf("bluefozes.com") > -1 ||
  window.location.href.indexOf("https://www.bluefozes.com") > -1
) {
  console.log("sport");
  if (window.location.href.indexOf("https://bluefozes.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/product/") > -1) {
    $(window).ready(function () {
      (async () => {
        await timeout(5000);
        data = JSON.parse(
          $(".variations_form ").attr("data-product_variations")
        );
        console.log(JSON.stringify(data));
        description = $("#tab-description").html();
        //description = null;
        product_type = data.type != "" ? data.type : data.tags[0];
        tags = "";
        images = [];
        content = $("head").html();
        content1 = content.split('"tags":"');
        if (content1[1] != undefined) {
          content2 = content1[1].split('"}');
          tags = content2[0].trim();
        }
        // console.log(tags);
        // console.log($("div.owl-item[style='width: 430px;']:not(.cloned) img"));
        $("div.owl-item[style='width: 430px;']:not(.cloned) img").each(
          function (image_key, image) {
            images[image_key] = $(image).attr("src");
          }
        );
        variants = [];

        // console.log(images);

        option1_name = "Style";
        option2_name = "Size";
        option1_picture = 0;

        data.forEach(function (variant, variant_key) {
          variant = {
            sku: variant.sku,
            image:
              variant.image.full_src != null
                ? variant.image.full_src
                : images[0],
            option1:
              variant.attributes.attribute_style != undefined
                ? variant.attributes.attribute_style
                : variant.attributes.attribute_color != undefined
                ? variant.attributes.attribute_color
                : "Crystal Clear",
            option2:
              variant.attributes.attribute_pa_size != undefined
                ? variant.attributes.attribute_pa_size
                : "One Size",
            origin_price: true,
            price: parseFloat(variant.display_price) - 20,
            cost: parseFloat(variant.display_price) - 20,
            shipping_cost: 0,
            quantity: 9999,
          };
          variants.push(variant);
        });
        //console.log(variants);
        product = {};
        product["store"] = true;
        product["title"] = $(".product_title").text();
        product["product_type"] = 51239;
        product["gender"] = "All";
        product["vender"] = "bluefozes";
        product["vender_url"] = window.location.href;
        product["description"] = description != undefined ? description : null;
        product["images"] = images;
        product["variants"] = variants;
        product["designed"] = -1;
        product["trending"] = trending === true ? 1 : 0;
        product["feedback"] = null;
        product["tags"] = tags;
        product["rank"] = null;
        product["delivery_date_min"] = 20;
        product["delivery_date_max"] = 45;
        product["option1_name"] = option1_name;
        product["option2_name"] = option2_name;
        product["option1_picture"] = 0;
        product["shipping_service_name"] = "Economy Shipping";
        product["location"] = "USA";
        product["vender_id"] = $(".variations_form ").attr("data-product_id");
        product["specifics"] = null;
        console.log(JSON.stringify(product));
        send(product, "bluefozes");
      })();
    });
  } else if (window.location.href.indexOf("/page/") > -1) {
    console.log("get product link");
    // page = $(".page-numbers .current")[0].textContent;
    // console.log(page);

    $(window).ready(function () {
      $(".product-loop-title").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".product-loop-title").length - 1) {
            setTimeout(function () {
              page = $(".page-numbers .current")[0].textContent;
              console.log(page);
              next_page = parseInt(page) + 1;
              var url_string = window.location.href;
              var url = url_string.replace(
                "/page/" + page,
                "/page/" + next_page
              );
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          url = $(item).attr("href");
          window.open(url, "_blank");
        }
      });
    });
  }
}

// https://sportselling.com/
else if (
  window.location.href.indexOf("https://www.lifeirl.com") > -1 ||
  window.location.href.indexOf("https://lifeirl.com") > -1
) {
  if (window.location.href.indexOf("https://lifeirl.com/#MainContent") > -1) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
    $(window).ready(function () {
      data = JSON.parse($("#ProductJson-product-template").text());
      console.log(JSON.stringify(data));
      description = data.description;

      variants = [];
      tags = "";
      product_type = data.type != "" ? data.type : data.tags[0];
      option1_name = data.options[0] != undefined ? data.options[0] : "";
      option2_name = data.options[1] != undefined ? data.options[1] : "";
      option1_picture = 0;
      data.tags.forEach(function (tag, tag_key) {
        if (tags != "") tags = tags + ", ";
        tags = tags + tag;
      });
      data.images.forEach(function (image, image_key) {
        data.images[image_key] = "https:" + image;
      });
      data.variants.forEach(function (variant, variant_key) {
        console.log(parseFloat(variant.price / 100).toFixed(2) - 2);
        if (variant.featured_image != null) option1_picture = 1;
        variant = {
          sku: variant.sku,
          image:
            variant.featured_image != null
              ? variant.featured_image.src
              : data.images[0],
          option1: variant.option1,
          option2: variant.option2,
          origin_price: true,
          price: parseFloat(variant.price / 100).toFixed(2) - 2,
          cost: parseFloat(variant.price / 100).toFixed(2) - 2,
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      });

      product = {};
      product["store"] = true;
      product["title"] = data.title;
      product["product_type"] =
        product_type != undefined ? product_type : "Manta-Product";
      product["gender"] = "All";
      product["vender"] = "hiep_lifeirl";
      product["vender_url"] = window.location.href;
      product["description"] =
        description != undefined ? description : data.content;
      product["images"] = data.images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags;
      product["rank"] = null;
      product["vender_id"] = data.id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      //console.log(JSON.stringify(product));
      send(product, "hiep_lifeirl");
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
    console.log("pageeeeeeeeee");
    $(window).ready(function () {
      $(".grid-product__image-link").each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          get_shirt99(key, item);

          if (key == $(".grid-product__image-link").length - 1) {
            setTimeout(function () {
              var url_string = window.location.href;
              var page = get("page");
              next_page = parseInt(page) + 1;
              var url = url_string.replace("page=" + page, "page=" + next_page);
              window.location.href = url;
            }, 10000);
          }
        }, 5000 * key);

        function get_shirt99(key, item) {
          var url = "https://lifeirl.com";
          url += $(item).attr("href");
          window.open(url, "_blank");
        }
      });
    });
  } else {
    window.close();
  }
}

// https://blackgirlsshop.com
else if (
  window.location.href.indexOf("blockofgear.com") > -1 ||
  window.location.href.indexOf("https://www.blockofgear.com") > -1
) {
  console.log("sport");
  if (
    window.location.href.indexOf("https://blockofgear.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/products/") > -1) {
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
          "support@blockofgear.com",
          "support@customray.com"
        );
        //console.log(description)
        title = $(".product_title").text().replace("Block Of Gear™", "");

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
        const textinput = $(".cl_inputs");
        var textResult = textinput.length ? 1 : 0;

        images = [];

        $(".woocommerce-product-gallery__image").each(function (
          image_key,
          image
        ) {
          images[image_key] = $(image).find("img").attr("src");
        });
        variants = [];

        //console.log(images);

        option1_name = null;
        option2_name = "Size";
        option1_picture = 0;
        nodechar = $(".woocommerce-breadcrumb").find("a").eq(1).text();
        nodecon = $(".woocommerce-breadcrumb").find("a").eq(2).text();

        listCate = [];

        if (nodechar) listCate.push(nodechar);
        if (nodecon) listCate.push(nodecon);

        if (listCate.length == 0) {
          listCate.push("Home");
          listCate.push("All");
        }
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
        if (
          Titlestring.indexOf("Bedding Set") != -1 ||
          Titlestring.indexOf("Quilt Bed Set") != -1
        ) {
          console.log("Hàng Bedding Set");
          cateOption = dataVariants["Bedding Set"];
        } else if (
          Titlestring.indexOf("Quilt") != -1 ||
          Titlestring.indexOf("Quilt Blanket") != -1
        ) {
          console.log("Hàng Quilt");
          cateOption = dataVariants["Quilt"];
        } else if (Titlestring.indexOf("Blanket") != -1) {
          console.log("Hàng Blanket");
          cateOption = dataVariants["Blanket"];
        } else if (Titlestring.indexOf("Doormat") != -1) {
          console.log("Hàng Home Doormat");
          cateOption = dataVariants["Home Doormat"];
        } else if (Titlestring.indexOf("Cushion Cover") != -1) {
          console.log("Hàng Cushion Cover");
          cateOption = dataVariants["Cushion Cover"];
        } else {
          console.log("Hàng None");
          window.close();
          Return;
        }
        //console.log(cateOption)

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
        //console.log(variants);
        product = {};
        product["store"] = true;
        product["customdesign"] = textResult;
        product["title"] = title;
        product["categories"] = listCate;
        product["gender"] = "All";
        product["vender"] = "blockofgear";
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
        //console.log(JSON.stringify(product));
        send(product, "blockofgear");
      })();
    });
  } else if (window.location.href.indexOf("/collections/") > -1) {
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
              next_page = parseInt(page) + 1;
              var url_string = window.location.href;
              var url = url_string.replace(
                "/page/" + page,
                "/page/" + next_page
              );
              window.location.href = url;
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

function get_variants_wordpress(images, price) {
  return new Promise(async (resolve, reject) => {
    option1_name = null;
    option2_name = null;
    variants = [];

    if ($(".extra-options.thwepo_simple tr").length >= 4)
      select_option_name = ".thwepo-conditional-field:not([style])";
    else select_option_name = ".extra-options.thwepo_simple tr";

    if ($(select_option_name + ":eq(0)").length > 0) {
      data_loops = [];
      $(select_option_name + ":eq(0) select option").each(function (
        index1,
        element1
      ) {
        label = $(select_option_name + ":eq(0) select").attr("name");
        value = $(element1).val();
        data_price =
          $(element1).attr("data-price") != undefined
            ? $(element1).attr("data-price")
            : null;
        data_price_type =
          $(element1).attr("data-price-type") != undefined
            ? $(element1).attr("data-price-type")
            : null;
        price_info_option1 =
          '{"' +
          label +
          '":{"name":"' +
          label +
          '","value":"' +
          value +
          '","price":' +
          data_price +
          ',"price_type":"' +
          data_price_type +
          '","price_unit":0,"quantity":"","multiple":0}';

        if ($(select_option_name + ":eq(1)").length > 0) {
          $(select_option_name + ":eq(1) select option").each(function (
            index2,
            element2
          ) {
            label = $(select_option_name + ":eq(1) select").attr("name");
            value = $(element2).val();
            data_price =
              $(element2).attr("data-price") != undefined
                ? $(element2).attr("data-price")
                : null;
            data_price_type =
              $(element2).attr("data-price-type") != undefined
                ? $(element2).attr("data-price-type")
                : null;
            price_info_option2 =
              '"' +
              label +
              '":{"name":"' +
              label +
              '","value":"' +
              value +
              '","price":' +
              data_price +
              ',"price_type":"' +
              data_price_type +
              '","price_unit":0,"quantity":"","multiple":0}}';
            price_info = price_info_option1 + "," + price_info_option2;
            option1_name = $(select_option_name + ":eq(0) .label-tag").text();
            option1 = $(element1).val();
            option2_name = $(select_option_name + ":eq(1) .label-tag").text();
            option2 = $(element2).val();
            data_loop = {
              option1: option1,
              option2: option2,
              option1_name: option1_name,
              option2_name: option2_name,
              price_info: price_info,
            };
            data_loops.push(data_loop);
          });
        } else {
          price_info = price_info_option1 + "}";
          option1 = $(element1).val();
          option1_name = $(select_option_name + ":eq(0) .label-tag").text();
          data_loop = {
            option1: option1,
            option2: option2,
            option1_name: option1_name,
            option2_name: option2_name,
            price_info: price_info,
          };
          data_loops.push(data_loop);
        }
      });

      var count_loop = 0;
      for await (let data_loop of data_loops) {
        price = 63.95;
        // let data_get_price_wordpress = await get_price_wordpress('https://writetee.shop',$('input[name$="gtm4wp_sku"]').val(),data_loop.price_info);
        // data_get_price_wordpress = JSON.parse(data_get_price_wordpress);
        // if(data_get_price_wordpress.result.final_price != undefined) price = data_get_price_wordpress.result.final_price - 2;
        variant = {
          sku: count_loop,
          image: images[0],
          option1: data_loop.option1,
          option2: data_loop.option2,
          origin_price: true,
          price: price,
          cost: price,
          shipping_cost: 0,
          quantity: 9999,
        };
        count_loop++;
        console.log(variant);
        variants.push(variant);
      }
      resolve({ variants, option1_name, option2_name });
    } else {
      variant = {
        sku: 1,
        image: images[0],
        option1: option1,
        option2: option2,
        origin_price: true,
        price: price,
        cost: price,
        shipping_cost: 0,
        quantity: 9999,
      };
      console.log(variant);
      variants.push(variant);
      resolve({ variants, option1_name, option2_name });
    }
  });
}

function get_price_wordpress(url, product_id, price_info) {
  return new Promise(async (resolve, reject) => {
    $.ajax({
      url: url + "/wp-admin/admin-ajax.php",
      type: "post",
      dataType: "text",
      data: {
        action: "thwepo_calculate_extra_cost",
        price_info:
          '{"product_id":"' +
          product_id +
          '","price_info":' +
          price_info +
          ',"is_variable_product":false}',
      },
      success: function (data) {
        resolve(data);
      },
      error: function (request, error) {
        resolve(error);
      },
    });
  });
}

function timeout(ms = 10000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
