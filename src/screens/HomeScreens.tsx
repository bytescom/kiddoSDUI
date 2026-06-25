import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ThemeProvider } from '../context/ThemeContext';
import SectionRenderer from '../components/SectionRenderer';
import { useCartStore } from '../store/useCartStore';
import payload from '../data/homepage.json';
import { HomepagePayload, Section } from '../types';

const data = payload as HomepagePayload;
const PRIMARY = '#FF9933';

// add Header
const Header = () => {
  const count = useCartStore((state) => state.count);

  return (
    <View style={styles.header}>
      {/* Row 1: Logo + Profile */}
      <View style={styles.logoRow}>
        {/* Logo mark */}
        <View style={styles.logoMark}>
          <Text style={styles.logoMarkText}>K</Text>
        </View>
        <Text style={styles.logoText}>
          Kiddo<Text style={styles.logoAccent}>SDUI</Text>
        </Text>

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Profile mock avatar */}
        <TouchableOpacity style={styles.avatar} activeOpacity={0.8}>
          <Text style={styles.avatarText}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Row 2: Location (left) + Cart (right) */}
      <View style={styles.locationRow}>
        {/* Location */}
        <TouchableOpacity style={styles.locationBtn} activeOpacity={0.75}>
          <Text style={styles.locationPin}>📍</Text>
          <View>
            <Text style={styles.deliverTo}>Deliver to</Text>
            <Text style={styles.locationName} numberOfLines={1}>Home – MG Road  ▾</Text>
          </View>
        </TouchableOpacity>

        {/* Cart badge */}
        <TouchableOpacity style={styles.cartBtn} activeOpacity={0.75}>
          <Text style={styles.cartEmoji}>🛒</Text>
          {count > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{count > 99 ? '99+' : count}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <ThemeProvider theme={data.theme}>
      <SafeAreaView style={[styles.container, { backgroundColor: data.theme.background }]}>
        <Header />
        <FlashList
          data={data.sections as Section[]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SectionRenderer section={item} />}
          estimatedItemSize={220}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 4 : 8,
    paddingBottom: 10,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoMark: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
  logoMarkText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -0.3,
  },
  logoAccent: {
    color: PRIMARY,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFF0DC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: PRIMARY,
  },
  avatarText: {
    fontSize: 16,
  },

  // Row 2
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  locationPin: {
    fontSize: 18,
  },
  deliverTo: {
    fontSize: 10,
    color: '#888',
    fontWeight: '500',
  },
  locationName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  cartBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF5E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartEmoji: {
    fontSize: 20,
  },
  cartBadge: {
    position: 'absolute',
    top: 3,
    right: 3,
    backgroundColor: PRIMARY,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '800',
  },
});

export default HomeScreen;