import { useState } from 'react';
import { 
  Wifi, 
  Battery, 
  Bell, 
  User, 
  Search,
  Home,
  FileText,
  MessageCircle,
  Newspaper,
  Settings,
  CreditCard,
  Building2,
  ClipboardList,
  AlertTriangle,
  Calendar,
  Ambulance,
  Heart,
  TrendingUp,
  CheckCircle,
  Scroll,
  Megaphone
} from 'lucide-react';

type NavigationTab = 'home' | 'services' | 'support' | 'news' | 'settings';

interface UserTypeSelectionProps {
  onSelect: () => void;
  onBack: () => void;
}

const BRAND_COLORS = {
  primary: '#F7502F',
  secondary: '#1D62AF',
  success: '#00A651',
  accent: '#FAFBFC',
  slate700: '#334155',
  slate600: '#475569',
  slate300: '#CBD5E1',
};

export default function UserTypeSelection({ onSelect, onBack }: UserTypeSelectionProps) {
  const [activeNav, setActiveNav] = useState<NavigationTab>('home');

  const handleHealthClick = () => {
    onSelect();
  };

  // Main Home Screen
  return (
    <div style={{ backgroundColor: BRAND_COLORS.accent, minHeight: '100vh' }}>
      {/* Status Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        backgroundColor: '#000',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500'
      }}>
        <div>6:41</div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Wifi size={16} />
          <Battery size={16} />
        </div>
      </div>

      {/* App Header */}
      <div style={{
        backgroundColor: BRAND_COLORS.primary,
        color: 'white',
        padding: '20px 16px'
      }}>
        {/* Header Top */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              N
            </div>
            <div>
              <h1 style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>My Naga</h1>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', opacity: 0.9 }}>Naga City Government</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <Bell size={20} color="white" />
              <div style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                backgroundColor: '#ff6b6b',
                borderRadius: '50%'
              }}></div>
            </button>
            <button style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={20} color="white" />
            </button>
          </div>
        </div>

        {/* Greeting */}
        <div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>Good Evening! 👋</h2>
          <p style={{ margin: '0', fontSize: '14px', opacity: 0.9 }}>Welcome back, how can we help you today?</p>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ padding: '16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'white',
          padding: '10px 12px',
          borderRadius: '8px',
          border: `1px solid ${BRAND_COLORS.slate300}`,
          marginBottom: '20px'
        }}>
          <Search size={20} color={BRAND_COLORS.slate600} />
          <input 
            type="text" 
            placeholder="Search services, documents..." 
            style={{
              border: 'none',
              outline: 'none',
              flex: 1,
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h3 style={{ margin: '0', fontSize: '16px', fontWeight: '600', color: BRAND_COLORS.slate700 }}>Quick Actions</h3>
            <button 
              onClick={handleHealthClick}
              style={{
                background: 'none',
                border: 'none',
                color: BRAND_COLORS.secondary,
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              See all →
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px'
          }}>
            {[
              { icon: FileText, label: 'Documents', color: BRAND_COLORS.primary },
              { icon: CreditCard, label: 'Pay Bills', color: BRAND_COLORS.secondary },
              { icon: Building2, label: 'Permits', color: BRAND_COLORS.primary },
              { icon: ClipboardList, label: 'Records', color: BRAND_COLORS.secondary },
              { icon: AlertTriangle, label: 'Report', color: BRAND_COLORS.primary },
              { icon: Calendar, label: 'Schedule', color: BRAND_COLORS.secondary },
              { icon: Ambulance, label: 'Emergency', color: BRAND_COLORS.primary },
              { icon: Heart, label: 'Health', color: BRAND_COLORS.secondary, isHealth: true },
            ].map((action, idx) => (
              <button
                key={idx}
                onClick={action.isHealth ? handleHealthClick : undefined}
                style={{
                  background: 'white',
                  border: `1px solid ${BRAND_COLORS.slate300}`,
                  borderRadius: '12px',
                  padding: '12px 8px',
                  cursor: action.isHealth ? 'pointer' : 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: action.color,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <action.icon size={24} color="white" strokeWidth={action.label === 'Health' ? 1 : 2} fill={action.label === 'Health' ? 'white' : 'none'} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '500', color: BRAND_COLORS.slate700, textAlign: 'center' }}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Services */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0', fontSize: '16px', fontWeight: '600', color: BRAND_COLORS.slate700 }}>Featured Services</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Business Permit */}
            <button style={{
              background: 'white',
              border: `1px solid ${BRAND_COLORS.slate300}`,
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: BRAND_COLORS.primary,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Building2 size={28} color="white" strokeWidth={2} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: BRAND_COLORS.slate700 }}>Business Permit Renewal</h4>
                  <p style={{ margin: '0', fontSize: '12px', color: BRAND_COLORS.slate600 }}>Renew your business permit online in minutes</p>
                </div>
              </div>
              <div style={{ color: BRAND_COLORS.primary, fontSize: '12px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} /> Quick Process
              </div>
            </button>

            {/* Community Tax */}
            <button style={{
              background: 'white',
              border: `1px solid ${BRAND_COLORS.slate300}`,
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: BRAND_COLORS.secondary,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Scroll size={28} color="white" strokeWidth={2} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: BRAND_COLORS.slate700 }}>Community Tax Certificate</h4>
                  <p style={{ margin: '0', fontSize: '12px', color: BRAND_COLORS.slate600 }}>Get your Cedula online and skip the queue</p>
                </div>
              </div>
              <div style={{ color: BRAND_COLORS.success, fontSize: '12px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle size={14} /> Available Now
              </div>
            </button>

            {/* Health Services */}
            <button 
              onClick={handleHealthClick}
              style={{
                background: 'white',
                border: `1px solid ${BRAND_COLORS.slate300}`,
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: BRAND_COLORS.success,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Heart size={28} color="white" fill="white" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: BRAND_COLORS.slate700 }}>KATUWANG Health Services</h4>
                  <p style={{ margin: '0', fontSize: '12px', color: BRAND_COLORS.slate600 }}>24/7 health assistance and emergency support</p>
                </div>
              </div>
              <div style={{ color: BRAND_COLORS.success, fontSize: '12px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle size={14} /> Team NAGANA
              </div>
            </button>
          </div>
        </div>

        {/* Announcements */}
        <div style={{ marginBottom: '100px' }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0', fontSize: '16px', fontWeight: '600', color: BRAND_COLORS.slate700 }}>Latest Updates</h3>
          </div>

          <div style={{
            background: `linear-gradient(135deg, ${BRAND_COLORS.success}15 0%, ${BRAND_COLORS.success}08 100%)`,
            border: `1px solid ${BRAND_COLORS.success}20`,
            borderRadius: '12px',
            padding: '16px'
          }}>
            <div style={{ color: BRAND_COLORS.success, fontSize: '12px', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Megaphone size={14} /> City Announcement
            </div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: BRAND_COLORS.slate700 }}>City-Wide Health Program</h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: BRAND_COLORS.slate600 }}>Free medical check-ups available at all barangay health centers this month. Register now!</p>
            <button style={{
              background: 'none',
              border: 'none',
              color: BRAND_COLORS.success,
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600'
            }}>
              Learn More →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTop: `1px solid ${BRAND_COLORS.slate300}`,
        paddingBottom: '8px',
        paddingTop: '8px'
      }}>
        {[
          { id: 'home', label: 'Home', icon: Home },
          { id: 'services', label: 'Services', icon: FileText },
          { id: 'support', label: 'Support', icon: MessageCircle },
          { id: 'news', label: 'News', icon: Newspaper },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id as NavigationTab)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              padding: '8px',
              color: activeNav === item.id ? BRAND_COLORS.secondary : BRAND_COLORS.slate600,
              transition: 'color 0.2s'
            }}
          >
            <item.icon size={24} />
            <span style={{ fontSize: '10px', fontWeight: '500' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
