import L from "leaflet";
import { createLayerComponent } from "@react-leaflet/core";
import getTileUrl from "../../api/TileApi";

L.TileLayer.Dynmap = L.TileLayer.extend({
    initialize: function(projection, options) {
        this.projection = projection;
        L.TileLayer.prototype.initialize.call(this, '', options);
    },

    getTileUrl: function(coords) {
        return getTileUrl(this.projection, coords.x, coords.y, coords.z);
    },

    getProjection: function() {
        return this.projection;
    },

    setProjection: function(projection) {
        this.projection = projection;
        this.redraw();
    },

    getAttribution: function() {
        return "NightMap"
    }
});

L.tileLayer.dynmap = function(projection, context) {
    return new L.TileLayer.Dynmap(projection, context);
}

const createDynmapLayer = (props, context) => {
    const instance = L.tileLayer.dynmap(props.projection, props);
    return {instance, context};
}

const updateDynmapLayer = (instance, props, prevProps) => {
    if (prevProps.projection !== props.projection) {
        if (instance.setProjection) instance.setProjection(props.projection)
    }

    if (prevProps.userId !== props.userId) {
        if (instance.setUserId) instance.setUserId(props.userId)
    }
}

const DynmapLayer = createLayerComponent(createDynmapLayer, updateDynmapLayer);
export default DynmapLayer;
