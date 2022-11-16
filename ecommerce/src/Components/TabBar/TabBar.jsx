export interface TabBarProps {
    style?: StyleProp<ViewStyle>;
    items: { icon: ImageRequireSource; label: string }[];
  }
  
  export const TabBar: React.FC<TabBarProps> = ({ style, items }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <View style={[styles.bar, style]}>
        {items.map((it, index) => (
          <TabItem
            key={index}
            style={styles.item}
            icon={it.icon}
            label={it.label}
            active={index === activeIndex}
            onPress={() => setActiveIndex(index)}
          />
        ))}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    bar: {
      flexDirection: "row",
      height: 60,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      backgroundColor: "white",
      overflow: "hidden",
    },
    item: {
      flex: 1,
    },
  });