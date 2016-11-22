import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import assign from 'object-assign';
import SegmentedControlProps from './PropsType';
import AndroidStyle from './style/';

export default class SegmentedControl extends React.Component<SegmentedControlProps, any> {
  static defaultProps = {
    selectedIndex: 0,
    enabled: true,
    values: [],
    onChange() {},
    onValueChange() {},
    tintColor: '#108ee9',
    style: {},
    styles: AndroidStyle,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex !== this.props.selectedIndex) {
      this.setState({
        selectedIndex: nextProps.selectedIndex,
      });
    }
  }

  onPress(e, index, value) {
    const { enabled, onChange, onValueChange } = this.props;
    if (enabled) {
      e.nativeEvent.selectedSegmentIndex = index;
      e.nativeEvent.value = value;
      if (onChange) {
        onChange(e);
      }
      if (onValueChange) {
        onValueChange(value);
      }
      this.setState({
        selectedIndex: index,
      });
    }
  }

  render() {
    const { style, enabled, values = [], tintColor, styles } = this.props;
    const selectedIndex = this.state.selectedIndex;
    const items = values.map((value, idx) => {
      let itemRadius: any = null;
      if (idx === 0) {
        itemRadius = styles.itemLeftRadius;
      } else if (idx === values.length - 1) {
        itemRadius = styles.itemRightRadius;
      }

      return (
        <TouchableWithoutFeedback key={idx} onPress={(e?: any) => this.onPress(e, idx, value)}>
          <View
            style={[styles.item, itemRadius, {
              backgroundColor: idx === selectedIndex ? tintColor : '#fff',
              borderColor: tintColor,
            }]}
          >
            <Text style={[styles.itemText, {
              color: idx === selectedIndex ? '#fff' : tintColor,
            }]}>{value}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });

    const enabledOpacity = enabled ? 1 : 0.5;
    const segmentedStyle = assign({}, style, {
      opacity: enabledOpacity,
      borderColor: tintColor,
    });

    return (
      <View style={[styles.segment, segmentedStyle, style]}>
        {items}
      </View>
    );
  }
}
