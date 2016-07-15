/* global google */
import _ from "lodash";

import {
  default as React,
  PropTypes,
} from "react";

import {
  MAP,
  MARKER,
} from "./constants";

import {
  addDefaultPrefixToPropTypes,
  collectUncontrolledAndControlledProps,
  default as enhanceElement,
} from "./enhanceElement";

const controlledPropTypes = {
  // NOTICE!!!!!!
  //
  // Only expose those with getters & setters in the table as controlled props.
  //
  // [].map.call($0.querySelectorAll("tr>td>code", function(it){ return it.textContent; })
  //    .filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
  //
  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker
  animation: PropTypes.any,

  attribution: PropTypes.any,

  clickable: PropTypes.bool,

  cursor: PropTypes.string,

  draggable: PropTypes.bool,

  icon: PropTypes.any,

  label: PropTypes.any,

  opacity: PropTypes.number,

  options: PropTypes.object,

  place: PropTypes.any,

  position: PropTypes.any,

  shape: PropTypes.any,

  title: PropTypes.string,

  visible: PropTypes.bool,

  zIndex: PropTypes.number,
};

const defaultUncontrolledPropTypes = addDefaultPrefixToPropTypes(controlledPropTypes);

const eventMap = {
  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker
  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
  onAnimationChanged: `animation_changed`,

  onClick: `click`,

  onClickableChanged: `clickable_changed`,

  onCursorChanged: `cursor_changed`,

  onDblClick: `dblclick`,

  onDrag: `drag`,

  onDragEnd: `dragend`,

  onDraggableChanged: `draggable_changed`,

  onDragStart: `dragstart`,

  onFlatChanged: `flat_changed`,

  onIconChanged: `icon_changed`,

  onMouseDown: `mousedown`,

  onMouseOut: `mouseout`,

  onMouseOver: `mouseover`,

  onMouseUp: `mouseup`,

  onPositionChanged: `position_changed`,

  onRightClick: `rightclick`,

  onShapeChanged: `shape_changed`,

  onTitleChanged: `title_changed`,

  onVisibleChanged: `visible_changed`,

  onZindexChanged: `zindex_changed`,
};

const publicMethodMap = {
  // Public APIs
  //
  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker
  //
  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
  //    .filter(function(it){ return it.match(/^get/) && !it.match(/Map$/); })
  getAnimation(marker) { return marker.getAnimation(); },

  getAttribution(marker) { return marker.getAttribution(); },

  getClickable(marker) { return marker.getClickable(); },

  getCursor(marker) { return marker.getCursor(); },

  getDraggable(marker) { return marker.getDraggable(); },

  getIcon(marker) { return marker.getIcon(); },

  getLabel(marker) { return marker.getLabel(); },

  getOpacity(marker) { return marker.getOpacity(); },

  getPlace(marker) { return marker.getPlace(); },

  getPosition(marker) { return marker.getPosition(); },

  getShape(marker) { return marker.getShape(); },

  getTitle(marker) { return marker.getTitle(); },

  getVisible(marker) { return marker.getVisible(); },

  getZIndex(marker) { return marker.getZIndex(); },
  // END - Public APIs
};

const controlledPropUpdaterMap = {
  animation(marker, animation) { marker.setAnimation(animation); },

  attribution(marker, attribution) { marker.setAttribution(attribution); },

  clickable(marker, clickable) { marker.setClickable(clickable); },

  cursor(marker, cursor) { marker.setCursor(cursor); },

  draggable(marker, draggable) { marker.setDraggable(draggable); },

  icon(marker, icon) { marker.setIcon(icon); },

  label(marker, label) { marker.setLabel(label); },

  opacity(marker, opacity) { marker.setOpacity(opacity); },

  options(marker, options) { marker.setOptions(options); },

  place(marker, place) { marker.setPlace(place); },

  position(marker, position) { marker.setPosition(position); },

  shape(marker, shape) { marker.setShape(shape); },

  title(marker, title) { marker.setTitle(title); },

  visible(marker, visible) { marker.setVisible(visible); },

  zIndex(marker, zIndex) { marker.setZIndex(zIndex); },
};

function getInstanceFromComponent(component) {
  return component.state[MARKER];
}

export default _.flowRight(
  React.createClass,
  enhanceElement(getInstanceFromComponent, publicMethodMap, eventMap, controlledPropUpdaterMap),
)({
  displayName: `Marker`,

  propTypes: {
    ...controlledPropTypes,
    ...defaultUncontrolledPropTypes,
  },

  contextTypes: {
    [MAP]: PropTypes.object,
  },

  getInitialState() {
    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker
    const marker = new google.maps.Marker({
      map: this.context[MAP],
      ...collectUncontrolledAndControlledProps(
        defaultUncontrolledPropTypes,
        controlledPropTypes,
        this.props
      ),
    });
    return {
      [MARKER]: marker,
    };
  },

  componentWillUnmount() {
    const marker = getInstanceFromComponent(this);
    if (marker) {
      marker.setMap(null);
    }
  },

  render() {
    return false;
  },
});