export const TabItem: React.FC<TabItemProps> = ({ style, icon, label, active, onPress }) => {
    const animation = useSpring({ to: active ? 1 : 0 }, { stiffness: 50 });
    const dotScale = animation;
    const iconTranslate = animation.interpolate({ inputRange: [0, 1], outputRange: [0, -30] });
    const labelTranslate = animation.interpolate({ inputRange: [0, 1], outputRange: [20, 0] });
    const iconVisibility = animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
    const labelVisibility = animation;
  
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.container, style]}>
          <Animated.View style={[styles.centered, { transform: [{ translateY: labelTranslate }] }]}>
            <DiagonalTransition visibility={labelVisibility}>
              <Text style={styles.label}>{label}</Text>
            </DiagonalTransition>
          </Animated.View>
          <Animated.View style={[styles.centered, { transform: [{ translateY: iconTranslate }] }]}>
            <DiagonalTransition visibility={iconVisibility}>
              <Image style={styles.icon} source={icon} />
            </DiagonalTransition>
          </Animated.View>
          <Animated.View style={[styles.dot, { transform: [{ scale: dotScale }] }]} />
        </View>
      </TouchableWithoutFeedback>
    );
  };