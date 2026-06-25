import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { handleAction } from '../actions/handleAction';

interface BannerData {
  imageUrl: string;
  title: string;
  subtitle: string;
  action: any;
}

const BannerHero: React.FC<{ data: BannerData }> = ({ data }) => {
  const theme = useTheme();
  console.log('BannerHero Render');

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleAction(data.action)}
    >
      <Image source={{ uri: data.imageUrl }} style={styles.image} />
      <View style={[styles.overlay, { backgroundColor: theme.primary + '99' }]}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subtitle}>{data.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { 
    margin: 12, borderRadius: 12, overflow: 'hidden' },
  image: { width: '100%', height: 200 },
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 16, color: '#fff', marginTop: 4 },
});

export default React.memo(BannerHero);