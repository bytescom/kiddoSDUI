import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { handleAction } from '../actions/handleAction';
import { useCartStore } from '../store/useCartStore';
import { ProductItem } from '../types';

const CARD_WIDTH = (Dimensions.get('window').width - 36) / 2;

interface GridData {
  products: ProductItem[];
}

const GridCard: React.FC<{ item: ProductItem }> = React.memo(({ item }) => {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const qty = useCartStore((state) => state.items[item.id] ?? 0);
  const theme = useTheme();

  console.log(`GridCard Render: ${item.id}`);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleAction(item.action)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={[styles.price, { color: theme.primary }]}>
        ₹{item.price}
      </Text>

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

const ProductGrid2x2: React.FC<{ data: GridData }> = ({ data }) => {
  const rows: ProductItem[][] = [];
  for (let i = 0; i < data.products.length; i += 2) {
    rows.push(data.products.slice(i, i + 2));
  }

  console.log('ProductGrid Parent Render');

  return (
    <View style={styles.container}>
      {rows.map((row, index) => (
        <View key={index} style={styles.row}>
          {row.map((item) => (
            <GridCard key={item.id} item={item} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 12 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 12 
  },
  card: { 
    width: CARD_WIDTH, 
    backgroundColor: '#fff',
    borderRadius: 12, 
    padding: 10, 
    elevation: 3 
  },
  image: { 
    width: '100%', 
    height: 100, 
    borderRadius: 8 
  },
  name: { 
    fontSize: 13, 
    marginTop: 6 
  },
  price: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    marginTop: 4, 
    marginBottom: 8 
  },
  addBtn: { 
    paddingVertical: 6, 
    borderRadius: 7, 
    borderWidth: 1.5,
    alignItems: 'center', 
    backgroundColor: '#FFF8F0' 
  },
  addBtnText: { 
    fontSize: 12, 
    fontWeight: '700', 
    letterSpacing: 0.4 
  },
  stepper: { 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between', 
    borderRadius: 7,
    paddingVertical: 5, 
    paddingHorizontal: 10 
  },
  stepperBtn: { 
    color: '#fff', 
    fontSize: 17, 
    fontWeight: '700', 
    lineHeight: 22 
  },
  stepperCount: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: '800',
    minWidth: 22, 
    textAlign: 'center' 
  },
});

export default React.memo(ProductGrid2x2);