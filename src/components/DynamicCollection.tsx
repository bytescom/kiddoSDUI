import React from 'react';
import { View, Text, FlatList, Image,
  TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { handleAction } from '../actions/handleAction';
import { useCartStore } from '../store/useCartStore';
import { ProductItem } from '../types';

interface CollectionData {
  title: string;
  items: ProductItem[];
}

const CollectionCard: React.FC<{ item: ProductItem }> = React.memo(({ item }) => {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const qty = useCartStore((state) => state.items[item.id] ?? 0);
  const theme = useTheme();

  console.log(`Card Render: ${item.id}`);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleAction(item.action)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>

      {qty === 0 ? (
        <TouchableOpacity
          style={[styles.addBtn, { borderColor: theme.primary }]}
          onPress={() => addItem(item.id)}
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
        >
          <Text style={[styles.addBtnText, { color: theme.primary }]}>
            + ADD
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={[styles.stepper, { backgroundColor: theme.primary }]}>
          <TouchableOpacity
            onPress={() => removeItem(item.id)}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Text style={styles.stepperBtn}>−</Text>
          </TouchableOpacity>
          <Text style={styles.stepperCount}>{qty}</Text>
          <TouchableOpacity
            onPress={() => addItem(item.id)}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Text style={styles.stepperBtn}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
});

const DynamicCollection: React.FC<{ data: CollectionData }> = ({ data }) => {
  const theme = useTheme();
  console.log('DynamicCollection Parent Render');
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.primary }]}>
        {data.title}
      </Text>
      <FlatList
        data={data.items}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CollectionCard item={item} />}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    marginVertical: 12 
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginLeft: 12, 
    marginBottom: 8 
  },
  card: { 
    width: 128, 
    margin: 8, 
    alignItems: 'center',
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 8, 
    elevation: 3 
  },
  image: { 
    width: 88, 
    height: 88, 
    borderRadius: 8 
  },
  name: { 
    fontSize: 12, 
    marginTop: 6, 
    textAlign: 'center' 
  },
  price: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    marginTop: 2, 
    marginBottom: 6 
  },
  addBtn: { 
    width: '100%', 
    paddingVertical: 5, 
    borderRadius: 6,
    borderWidth: 1.5, 
    alignItems: 'center', 
    backgroundColor: '#FFF8F0', 
    marginTop: 2 
  },
  addBtnText: { 
    fontSize: 11, 
    fontWeight: '700', 
    letterSpacing: 0.3 
  },
  stepper: { 
    width: '100%', 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between', 
    borderRadius: 6,
    paddingVertical: 4, 
    paddingHorizontal: 8, 
    marginTop: 2 
  },
  stepperBtn: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '700', 
    lineHeight: 20 
  },
  stepperCount: { 
    color: '#fff', 
    fontSize: 13, 
    fontWeight: '800',
    minWidth: 20, 
    textAlign: 'center' 
  },
});

export default React.memo(DynamicCollection);