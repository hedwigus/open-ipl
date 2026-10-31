import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const features = [
  { mark: "₨", title: "Monthly dues", description: "See what’s due and keep payment records together." },
  { mark: "↗", title: "Group updates", description: "Stay informed with news and leader announcements." },
  { mark: "✳", title: "Member voice", description: "Send questions, feedback, or a private complaint." },
];

export default function OpenIPLApp() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.brandRow}>
          <View style={styles.brandMark}><Text style={styles.brandMarkText}>O</Text></View>
          <View><Text style={styles.brandName}>Open IPL</Text><Text style={styles.brandCaption}>MEMBER APP</Text></View>
        </View>
        <View style={styles.hero}>
          <Text style={styles.version}>VERSION 1.0 FOUNDATION</Text>
          <Text style={styles.title}>Your group,{"\n"}in one place.</Text>
          <Text style={styles.subtitle}>Monthly dues, important updates, and member conversations—organized for the groups you belong to.</Text>
          <View style={styles.groupBadge}><Text style={styles.groupBadgeIcon}>◎</Text><Text style={styles.groupBadgeText}>One account · Your approved groups</Text></View>
        </View>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>What you’ll find here</Text><Text style={styles.sectionCaption}>MADE FOR MEMBERS</Text></View>
        <View style={styles.featureList}>
          {features.map((feature) => (
            <View style={styles.featureCard} key={feature.title}>
              <View style={styles.featureMark}><Text style={styles.featureMarkText}>{feature.mark}</Text></View>
              <View style={styles.featureCopy}><Text style={styles.featureTitle}>{feature.title}</Text><Text style={styles.featureDescription}>{feature.description}</Text></View>
              <Text style={styles.featureArrow}>›</Text>
            </View>
          ))}
        </View>
        <View style={styles.nextCard}>
          <Text style={styles.nextEyebrow}>MEMBER ONBOARDING</Text>
          <Text style={styles.nextTitle}>Sign in, then join with your Group ID.</Text>
          <Text style={styles.nextDescription}>Your group leader reviews your request before you can access group features. Google sign-in and the join flow will be connected in the next build step.</Text>
        </View>
        <Text style={styles.footer}>Your group information stays within Open IPL. Payment providers process only the transaction data they need.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f4f7f4" },
  page: { width: "100%", maxWidth: 560, alignSelf: "center", paddingHorizontal: 22, paddingTop: 18, paddingBottom: 34 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 11, marginBottom: 36 },
  brandMark: { width: 40, height: 40, borderRadius: 14, backgroundColor: "#193d2d", alignItems: "center", justifyContent: "center" },
  brandMarkText: { color: "#c7f2d1", fontSize: 23, fontWeight: "800" },
  brandName: { color: "#18362a", fontSize: 17, fontWeight: "800", letterSpacing: -0.4 },
  brandCaption: { color: "#779084", fontSize: 9, fontWeight: "700", letterSpacing: 1.5, marginTop: 2 },
  hero: { backgroundColor: "#e3f2e7", borderRadius: 22, padding: 24, overflow: "hidden" },
  version: { color: "#578167", fontSize: 9, fontWeight: "800", letterSpacing: 1.2 },
  title: { color: "#17372a", fontSize: 39, lineHeight: 44, fontWeight: "800", letterSpacing: -1.8, marginTop: 18 },
  subtitle: { color: "#62796c", fontSize: 14, lineHeight: 21, marginTop: 12 },
  groupBadge: { flexDirection: "row", alignItems: "center", gap: 8, alignSelf: "flex-start", marginTop: 24, borderRadius: 999, backgroundColor: "#f8fcf8", paddingHorizontal: 12, paddingVertical: 8 },
  groupBadgeIcon: { color: "#397350", fontSize: 14, fontWeight: "800" },
  groupBadgeText: { color: "#537060", fontSize: 10, fontWeight: "700" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30, marginBottom: 12 },
  sectionTitle: { color: "#20342b", fontSize: 16, fontWeight: "800", letterSpacing: -0.3 },
  sectionCaption: { color: "#819188", fontSize: 8, fontWeight: "800", letterSpacing: 1 },
  featureList: { gap: 9 },
  featureCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 15, borderWidth: 1, borderColor: "#e2e9e3", backgroundColor: "#fff" },
  featureMark: { width: 38, height: 38, borderRadius: 12, backgroundColor: "#eff7f0", alignItems: "center", justifyContent: "center" },
  featureMarkText: { color: "#397350", fontSize: 17, fontWeight: "800" },
  featureCopy: { flex: 1 },
  featureTitle: { color: "#24362d", fontSize: 12, fontWeight: "800" },
  featureDescription: { color: "#809087", fontSize: 10, lineHeight: 15, marginTop: 4 },
  featureArrow: { color: "#9aaba0", fontSize: 23 },
  nextCard: { marginTop: 14, padding: 18, borderRadius: 15, backgroundColor: "#183b2d" },
  nextEyebrow: { color: "#a6d8b1", fontSize: 8, fontWeight: "800", letterSpacing: 1.2 },
  nextTitle: { color: "#f1fbf3", fontSize: 16, fontWeight: "800", lineHeight: 22, marginTop: 8 },
  nextDescription: { color: "#c1d5c8", fontSize: 11, lineHeight: 17, marginTop: 7 },
  footer: { color: "#8b9b91", fontSize: 9, lineHeight: 14, textAlign: "center", marginTop: 18, paddingHorizontal: 8 },
});
