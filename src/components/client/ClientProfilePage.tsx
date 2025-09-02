
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  User, 
  Mail, 
  Phone, 
  Key, 
  Bell, 
  Shield, 
  Calendar, 
  Clock,
  CheckCircle2,
  XCircle,
  Upload
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '../ui/dialog';
import { Switch } from '../ui/switch';

// Sample user data with fixed avatar URL
const userData = {
  name: 'Emma Wilson',
  email: 'emma.wilson@example.com',
  phone: '(555) 123-4567',
  avatar: '/services/hydrating-skin-therapy.jpg', // Use local image instead of external URL
  joinDate: '2024-01-15',
  appointmentsCompleted: 8,
  skinType: 'Combination',
  skinConcerns: ['Fine Lines', 'Dryness', 'Sensitivity'],
  allergies: 'None reported',
  preferences: {
    appointmentReminders: true,
    promotionalEmails: false,
    newsletterSubscription: true,
    textNotifications: true,
  },
  preferredAppointmentDays: ['Tuesday', 'Thursday'],
  preferredAppointmentTimes: ['Morning', 'Afternoon'],
  preferredTreatments: ['Advanced Facial Treatment', 'Anti-Aging Treatments']
};

export const ClientProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  
  // State for editable fields
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [skinType, setSkinType] = useState(userData.skinType);
  const [allergies, setAllergies] = useState(userData.allergies);
  
  // State for preferences
  const [preferences, setPreferences] = useState({...userData.preferences});
  
  // Handle save profile changes
  const handleSaveChanges = () => {
    // Here you would typically call an API to update user data
    setEditing(false);
  };

  // Handle preference changes
  const handlePreferenceChange = (key: keyof typeof preferences, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Your Profile</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Profile sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="relative">
                <ImageWithFallback
                  src={userData.avatar}
                  alt={userData.name}
                  className="rounded-full h-24 w-24 object-cover mb-4"
                  type="avatar"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-2 right-0 h-8 w-8 rounded-full bg-primary text-white"
                >
                  <Upload className="h-4 w-4" />
                  <span className="sr-only">Change photo</span>
                </Button>
              </div>
              <h3 className="font-medium text-xl">{userData.name}</h3>
              <p className="text-sm text-muted-foreground">Client</p>
              <div className="flex items-center mt-2">
                <Badge variant="outline">
                  <Calendar className="h-3 w-3 mr-1" />
                  Member since {new Date(userData.joinDate).toLocaleDateString()}
                </Badge>
              </div>
              
              <div className="border-t border-border/30 w-full mt-4 pt-4 flex justify-around">
                <div className="text-center">
                  <p className="text-2xl font-bold">{userData.appointmentsCompleted}</p>
                  <p className="text-xs text-muted-foreground">Appointments</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-muted-foreground">Products</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Services</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Personal Preferences</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Preferred Days</h4>
                  <div className="flex flex-wrap gap-1">
                    {userData.preferredAppointmentDays.map((day, index) => (
                      <Badge key={index} variant="outline">{day}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Preferred Times</h4>
                  <div className="flex flex-wrap gap-1">
                    {userData.preferredAppointmentTimes.map((time, index) => (
                      <Badge key={index} variant="outline">{time}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Favorite Treatments</h4>
                  <div className="flex flex-wrap gap-1">
                    {userData.preferredTreatments.map((treatment, index) => (
                      <Badge key={index} variant="outline">{treatment}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setChangePasswordOpen(true)}
          >
            <Key className="mr-2 h-4 w-4" />
            Change Password
          </Button>
        </div>
        
        {/* Main profile content */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Personal Information</CardTitle>
                <Button onClick={() => setEditing(!editing)}>
                  {editing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {editing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skin-type">Skin Type</Label>
                      <select 
                        id="skin-type" 
                        className="w-full p-2 border border-border rounded-md"
                        value={skinType}
                        onChange={(e) => setSkinType(e.target.value)}
                      >
                        <option value="Normal">Normal</option>
                        <option value="Dry">Dry</option>
                        <option value="Oily">Oily</option>
                        <option value="Combination">Combination</option>
                        <option value="Sensitive">Sensitive</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies & Sensitivities</Label>
                    <Input 
                      id="allergies" 
                      value={allergies} 
                      onChange={(e) => setAllergies(e.target.value)} 
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Full Name</p>
                          <p className="font-medium">{userData.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email Address</p>
                          <p className="font-medium">{userData.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone Number</p>
                          <p className="font-medium">{userData.phone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Skin Type</p>
                        <p className="font-medium">{userData.skinType}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Skin Concerns</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {userData.skinConcerns.map((concern, index) => (
                            <Badge key={index} variant="outline">{concern}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Allergies & Sensitivities</p>
                        <p className="font-medium">{userData.allergies}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Tabs defaultValue="notifications">
            <TabsList>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security & Privacy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Appointment Reminders</h4>
                      <p className="text-sm text-muted-foreground">
                        Get notified about upcoming appointments
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.appointmentReminders} 
                      onCheckedChange={(checked) => handlePreferenceChange('appointmentReminders', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Text Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via text message
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.textNotifications} 
                      onCheckedChange={(checked) => handlePreferenceChange('textNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Promotional Emails</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about promotions and special offers
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.promotionalEmails} 
                      onCheckedChange={(checked) => handlePreferenceChange('promotionalEmails', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Newsletter Subscription</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive our monthly newsletter
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.newsletterSubscription} 
                      onCheckedChange={(checked) => handlePreferenceChange('newsletterSubscription', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Security & Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Data Privacy</h4>
                      <p className="text-sm text-muted-foreground">
                        Review how we use your data
                      </p>
                    </div>
                    <Button variant="outline">View Policy</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Account Activity</h4>
                      <p className="text-sm text-muted-foreground">
                        View recent account activity and login history
                      </p>
                    </div>
                    <Button variant="outline">View Activity</Button>
                  </div>
                  
                  <div className="border-t border-border/30 pt-6">
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Change Password Dialog */}
      <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-2">Password Requirements:</h4>
              <ul className="space-y-1">
                <li className="flex items-center text-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2" />
                  <span>Minimum 8 characters</span>
                </li>
                <li className="flex items-center text-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2" />
                  <span>At least one uppercase letter</span>
                </li>
                <li className="flex items-center text-xs">
                  <XCircle className="h-3.5 w-3.5 text-red-500 mr-2" />
                  <span>At least one number</span>
                </li>
                <li className="flex items-center text-xs">
                  <XCircle className="h-3.5 w-3.5 text-red-500 mr-2" />
                  <span>At least one special character</span>
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setChangePasswordOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setChangePasswordOpen(false)}>
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
