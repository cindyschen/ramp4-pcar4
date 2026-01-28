import { defineComponent as b, inject as B, useTemplateRef as A, ref as u, computed as m, onBeforeMount as R, onMounted as M, onBeforeUnmount as P, resolveDirective as k, openBlock as z, createElementBlock as T, createElementVNode as g, normalizeStyle as H, withDirectives as N, unref as F, vModelText as O } from "vue";
import { F as _, a as V, G as h, _ as W } from "./main-Cjw-2LjF.js";
import "pinia";
import "vue-i18n";
import "screenfull";
import "lodash.clonedeep";
import "vue-tippy";
import "linkify-html";
import "@popperjs/core";
import "@arcgis/core/Color";
import "@arcgis/core/config";
import "@arcgis/core/core/reactiveUtils.js";
import "@arcgis/core/geometry/Extent";
import "@arcgis/core/geometry/Multipoint";
import "@arcgis/core/geometry/Point";
import "@arcgis/core/geometry/Polygon";
import "@arcgis/core/geometry/Polyline";
import "@arcgis/core/geometry/SpatialReference";
import "@arcgis/core/geometry/support/jsonUtils";
import "@arcgis/core/Graphic";
import "@arcgis/core/request";
import "@arcgis/core/symbols/PictureMarkerSymbol";
import "@arcgis/core/symbols/SimpleFillSymbol";
import "@arcgis/core/symbols/SimpleLineSymbol";
import "@arcgis/core/symbols/SimpleMarkerSymbol";
import "@arcgis/core/symbols/support/jsonUtils";
import "@arcgis/map-components/components/arcgis-swipe";
import "deepmerge";
import "@terraformer/spatial";
import "proj4";
import "throttle-debounce";
import "@terraformer/arcgis";
import "csv2geojson";
import "redaxios";
import "await-to-js";
import "svg.js";
import "tiny-emitter";
const D = { class: "swipe-container" }, G = ["id", "aria-valuenow", "aria-label", "content"], U = ["swipe-position", "view"], Y = /* @__PURE__ */ b({
  __name: "swipe",
  props: {
    fixture: {
      type: _,
      required: !0
    },
    message: String
  },
  setup(x) {
    const r = B("iApi"), p = V(), t = A("slider"), c = u(45), v = u(0), d = u(0), f = u(50), y = u(), i = u(), $ = m(() => {
      const n = 30 + d.value - d.value, o = t.value?.getBoundingClientRect() ? t.value?.getBoundingClientRect().right - t.value?.getBoundingClientRect().left : 0, e = +c.value / 90, a = (o - n) * e, w = (t.value?.getBoundingClientRect().x ?? 0) + a + (n - 5.25) / 2;
      return f.value = w / r.$rootEl.clientWidth * 100 + 0.2, `${w}px`;
    }), C = m(() => `${v.value}px`), S = m(() => `${-v.value / 2 - 18}px`);
    R(() => {
      v.value = r.$rootEl?.clientHeight ?? 1200;
    });
    const L = () => {
      v.value = r.$rootEl?.clientHeight ?? v.value, d.value++, setTimeout(() => {
        d.value++;
      }, 50);
    }, s = () => {
      p.setOpacity(0.1), t.value.style.background = "";
    }, l = () => {
      p.setOpacity(1), t.value.style.background = "inherit";
    };
    M(async () => {
      "ontouchstart" in document.documentElement || !window.matchMedia("(pointer:fine)").matches || (t.value.style.background = "inherit"), window.addEventListener("resize", L), t.value?.addEventListener("focus", s), t.value?.addEventListener("blur", l), t.value?.addEventListener("mouseover", s), t.value?.addEventListener("mouseleave", l), t.value?.addEventListener("touchstart", s), t.value?.addEventListener("touchend", l), setTimeout(() => {
        d.value++;
      }, 50), await E(), r.event.on(h.MAP_BASEMAPCHANGE, async (o) => {
        o.schemaChanged && (i.value?.trailingLayers.forEach((e) => {
          i.value?.trailingLayers.remove(e);
        }), i.value?.leadingLayers.forEach((e) => {
          i.value?.leadingLayers.remove(e);
        }), await E());
      }), r.event.on(h.LAYER_RELOAD_END, (o) => {
        i.value?.trailingLayers.forEach((e) => {
          e.id === o.id && (i.value?.trailingLayers.remove(e), i.value?.trailingLayers.add(o.esriLayer));
        }), i.value?.leadingLayers.forEach((e) => {
          e.id === o.id && (i.value?.leadingLayers.remove(e), i.value?.leadingLayers.add(o.esriLayer));
        });
      }), r.event.on(h.LAYER_REMOVE, (o) => {
        i.value?.trailingLayers.forEach((e) => {
          e.id === o.id && i.value?.trailingLayers.remove(e);
        }), i.value?.leadingLayers.forEach((e) => {
          e.id === o.id && i.value?.leadingLayers.remove(e);
        });
      });
    });
    const E = async () => {
      await r.geo.map.viewPromise, y.value = r.geo.map.esriView;
      const n = ["Nature", "WFSLayer"], o = ["Water", "GeoMet"];
      n.forEach((e) => {
        r.geo.layer.awaitLayer(e, !0).then((a) => {
          a.esriLayer ? i.value?.trailingLayers.add(a.esriLayer) : console.warn(`Invalid layer instance: ${e}`);
        });
      }), o.forEach((e) => {
        r.geo.layer.awaitLayer(e, !0).then((a) => {
          a.esriLayer ? i.value?.leadingLayers.add(a.esriLayer) : console.warn(`Invalid layer instance: ${e}`);
        });
      });
    };
    return P(() => {
      window.removeEventListener("resize", L), t.value?.removeEventListener("focus", () => s), t.value?.removeEventListener("blur", () => l), t.value?.removeEventListener("mouseover", s), t.value?.removeEventListener("mouseleave", l), t.value?.removeEventListener("touchstart", s), t.value?.removeEventListener("touchend", l);
    }), (n, o) => {
      const e = k("tippy");
      return z(), T("div", D, [
        g("div", {
          class: "verticalLine",
          style: H({ left: $.value, height: C.value, bottom: S.value })
        }, null, 4),
        N(g("input", {
          "onUpdate:modelValue": o[0] || (o[0] = (a) => c.value = a),
          id: "layerSlider" + F(r).$element._uid,
          class: "layerSliderElement",
          type: "range",
          ref_key: "slider",
          ref: t,
          min: "0",
          "aria-valuemin": "0",
          "aria-valuemax": "90",
          "aria-valuenow": c.value,
          "aria-label": n.$t("map.layerSwipe.label"),
          max: "90",
          step: "0.5",
          content: n.$t("map.layerSwipe.drag"),
          style: { "z-index": 10 }
        }, null, 8, G), [
          [O, c.value],
          [e, { followCursor: !0, trigger: "mouseenter" }]
        ]),
        g("arcgis-swipe", {
          direction: "horizontal",
          "swipe-position": f.value,
          view: y.value,
          "auto-destroy-disable": "",
          ref_key: "swipeComponent",
          ref: i
        }, null, 8, U)
      ]);
    };
  }
}), j = /* @__PURE__ */ W(Y, [["__scopeId", "data-v-0804fa06"]]);
class Re extends _ {
  async added() {
    const { el: r, destroy: p } = this.mount(j, {
      app: this.$element,
      props: { fixture: this }
    });
    r.childNodes[0] && this.$vApp.$el.appendChild(r.childNodes[0]), this.removed = () => {
      p();
    };
  }
}
export {
  Re as default
};
