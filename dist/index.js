'use strict';

const bps_env = require('babel-preset-env').default;
const bps_stage_3 = require('babel-preset-stage-3');
const bpi_offside_js = require('babel-plugin-offside-js');
const bpi_class_props = require('babel-plugin-transform-class-properties');

module.exports = exports = function preset(context, opts = {}) {
  if (!opts.targets) {
    opts.targets = { node: 'current' };
  }

  if (true === opts.targets.browser) {
    opts.targets.browser = 'last 1 versions, > 2% in US';
  }

  let presets = [[bps_env, opts], [bps_stage_3]];

  let plugins = [bpi_class_props, bpi_offside_js];

  return { presets, plugins };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NvZGUvaW5kZXguanMiXSwibmFtZXMiOlsiYnBzX2VudiIsInJlcXVpcmUiLCJkZWZhdWx0IiwiYnBzX3N0YWdlXzMiLCJicGlfb2Zmc2lkZV9qcyIsImJwaV9jbGFzc19wcm9wcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJwcmVzZXQiLCJjb250ZXh0Iiwib3B0cyIsInRhcmdldHMiLCJub2RlIiwiYnJvd3NlciIsInByZXNldHMiLCJwbHVnaW5zIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQSxNQUFNQSxVQUFVQyxRQUFRLGtCQUFSLEVBQTRCQyxPQUE1QztBQUNBLE1BQU1DLGNBQWNGLFFBQVEsc0JBQVIsQ0FBcEI7QUFDQSxNQUFNRyxpQkFBaUJILFFBQVEseUJBQVIsQ0FBdkI7QUFDQSxNQUFNSSxrQkFBa0JKLFFBQVEseUNBQVIsQ0FBeEI7O0FBRUFLLE9BQU9DLE9BQVAsR0FBaUJBLFVBQVUsU0FBU0MsTUFBVCxDQUFnQkMsT0FBaEIsRUFBeUJDLE9BQUssRUFBOUIsRUFBa0M7QUFDM0QsTUFBSSxDQUFDQSxLQUFLQyxPQUFWLEVBQW1CO0FBQ2pCRCxTQUFLQyxPQUFMLEdBQWUsRUFBSUMsTUFBTSxTQUFWLEVBQWY7QUFBa0M7O0FBRXBDLE1BQUksU0FBU0YsS0FBS0MsT0FBTCxDQUFhRSxPQUExQixFQUFtQztBQUNqQ0gsU0FBS0MsT0FBTCxDQUFhRSxPQUFiLEdBQXVCLDZCQUF2QjtBQUFvRDs7QUFFdEQsTUFBSUMsVUFDRixDQUFJLENBQUlkLE9BQUosRUFBYVUsSUFBYixDQUFKLEVBQ0ksQ0FBSVAsV0FBSixDQURKLENBREY7O0FBSUEsTUFBSVksVUFDRixDQUFJVixlQUFKLEVBQ0lELGNBREosQ0FERjs7QUFJQSxTQUFPLEVBQUlVLE9BQUosRUFBYUMsT0FBYixFQUFQO0FBQTJCLENBZjdCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5jb25zdCBicHNfZW52ID0gcmVxdWlyZSgnYmFiZWwtcHJlc2V0LWVudicpLmRlZmF1bHRcbmNvbnN0IGJwc19zdGFnZV8zID0gcmVxdWlyZSgnYmFiZWwtcHJlc2V0LXN0YWdlLTMnKVxuY29uc3QgYnBpX29mZnNpZGVfanMgPSByZXF1aXJlKCdiYWJlbC1wbHVnaW4tb2Zmc2lkZS1qcycpXG5jb25zdCBicGlfY2xhc3NfcHJvcHMgPSByZXF1aXJlKCdiYWJlbC1wbHVnaW4tdHJhbnNmb3JtLWNsYXNzLXByb3BlcnRpZXMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmdW5jdGlvbiBwcmVzZXQoY29udGV4dCwgb3B0cz17fSkgOjpcbiAgaWYgKCFvcHRzLnRhcmdldHMpIDo6XG4gICAgb3B0cy50YXJnZXRzID0gQHt9IG5vZGU6ICdjdXJyZW50J1xuXG4gIGlmICh0cnVlID09PSBvcHRzLnRhcmdldHMuYnJvd3NlcikgOjpcbiAgICBvcHRzLnRhcmdldHMuYnJvd3NlciA9ICdsYXN0IDEgdmVyc2lvbnMsID4gMiUgaW4gVVMnXG5cbiAgbGV0IHByZXNldHMgPVxuICAgIEBbXSBAW10gYnBzX2Vudiwgb3B0c1xuICAgICAgLCBAW10gYnBzX3N0YWdlXzNcblxuICBsZXQgcGx1Z2lucyA9IFxuICAgIEBbXSBicGlfY2xhc3NfcHJvcHNcbiAgICAgICwgYnBpX29mZnNpZGVfanNcblxuICByZXR1cm4gQHt9IHByZXNldHMsIHBsdWdpbnNcblxuIl19