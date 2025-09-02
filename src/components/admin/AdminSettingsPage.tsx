
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { NativeSelect } from '../ui/native-select';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const AdminSettingsPage = () => {
  // State for switch components
  const [autoLogout, setAutoLogout] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appointmentNotifications, setAppointmentNotifications] = useState(true);
  const [reminderNotifications, setReminderNotifications] = useState(true);
  const [cancellationNotifications, setCancellationNotifications] = useState(true);
  const [clientNotifications, setClientNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [debugMode, setDebugMode] = useState(false);

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>

      <Tabs defaultValue="general">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 space-y-2">
            <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
              <TabsTrigger
                className="w-full justify-start px-3 h-10 data-[state=active]:bg-muted"
                value="general"
              >
                General
              </TabsTrigger>
              <TabsTrigger
                className="w-full justify-start px-3 h-10 data-[state=active]:bg-muted"
                value="business"
              >
                Business Information
              </TabsTrigger>
              <TabsTrigger
                className="w-full justify-start px-3 h-10 data-[state=active]:bg-muted"
                value="account"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                className="w-full justify-start px-3 h-10 data-[state=active]:bg-muted"
                value="notifications"
              >
                Notifications
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1">
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <NativeSelect
                      id="timezone"
                      defaultValue="America/New_York"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="America/Anchorage">Alaska Time (AKT)</option>
                      <option value="Pacific/Honolulu">Hawaii Time (HT)</option>
                    </NativeSelect>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <NativeSelect
                      id="dateFormat"
                      defaultValue="MM/DD/YYYY"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      <option value="MMMM D, YYYY">MMMM D, YYYY</option>
                    </NativeSelect>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeFormat">Time Format</Label>
                    <NativeSelect
                      id="timeFormat"
                      defaultValue="12"
                    >
                      <option value="12">12-hour (1:30 PM)</option>
                      <option value="24">24-hour (13:30)</option>
                    </NativeSelect>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <NativeSelect
                      id="language"
                      defaultValue="en"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </NativeSelect>
                  </div>
                  {/*                   
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoLogout">Auto-logout after inactivity</Label>
                    <Switch 
                      id="autoLogout" 
                      checked={autoLogout}
                      onCheckedChange={setAutoLogout}
                    />
                  </div>
                   */}
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="business" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input id="businessName" defaultValue="K DERMA Beauty Clinic" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="0967 295 5646" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <Input id="email" defaultValue="info@kderma.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="National Highway, Poblacion 4" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue="Calaca" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Province</Label>
                      <Input id="state" defaultValue="Batangas" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" defaultValue="4212" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" defaultValue="Philippines" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Business Logo</Label>
                    <div className="flex items-center gap-4">
                      <ImageWithFallback
                        src="/imports/derma-logo.jpg"
                        alt="K DERMA Logo"
                        className="h-16 w-16 object-cover rounded"
                      />
                      <Button variant="outline">Change Logo</Button>
                    </div>
                  </div>

                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Email Address</Label>
                    <Input id="adminEmail" defaultValue="admin@admin" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  {/* 
                  <div className="flex items-center justify-between">
                    <Label htmlFor="twoFactor">Enable Two-Factor Authentication</Label>
                    <Switch
                      id="twoFactor"
                      checked={twoFactor}
                      onCheckedChange={setTwoFactor}
                    />
                  </div> 
                  */}
                  <Button>Update Account</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Appointment Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified when new appointments are scheduled</p>
                    </div>
                    <Switch
                      id="appointmentNotifications"
                      checked={appointmentNotifications}
                      onCheckedChange={setAppointmentNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Appointment Reminder Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified about upcoming appointments</p>
                    </div>
                    <Switch
                      id="reminderNotifications"
                      checked={reminderNotifications}
                      onCheckedChange={setReminderNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Appointment Cancellation Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified when appointments are cancelled</p>
                    </div>
                    <Switch
                      id="cancellationNotifications"
                      checked={cancellationNotifications}
                      onCheckedChange={setCancellationNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Client Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified when new clients register</p>
                    </div>
                    <Switch
                      id="clientNotifications"
                      checked={clientNotifications}
                      onCheckedChange={setClientNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified about system updates and maintenance</p>
                    </div>
                    <Switch
                      id="systemNotifications"
                      checked={systemNotifications}
                      onCheckedChange={setSystemNotifications}
                    />
                  </div>

                  <Button>Save Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border border-border p-4 rounded-md cursor-pointer bg-white">
                        <div className="h-8 w-full bg-primary mb-2 rounded"></div>
                        <p className="text-sm text-center">Light</p>
                      </div>
                      <div className="border border-primary p-4 rounded-md cursor-pointer bg-muted">
                        <div className="h-8 w-full bg-primary mb-2 rounded"></div>
                        <p className="text-sm text-center">System</p>
                      </div>
                      <div className="border border-border p-4 rounded-md cursor-pointer bg-gray-900">
                        <div className="h-8 w-full bg-primary mb-2 rounded"></div>
                        <p className="text-sm text-center text-white">Dark</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="grid grid-cols-6 gap-2">
                      <div className="h-8 w-full bg-[#FF6B9C] rounded-md cursor-pointer border-2 border-primary"></div>
                      <div className="h-8 w-full bg-blue-500 rounded-md cursor-pointer"></div>
                      <div className="h-8 w-full bg-green-500 rounded-md cursor-pointer"></div>
                      <div className="h-8 w-full bg-purple-500 rounded-md cursor-pointer"></div>
                      <div className="h-8 w-full bg-amber-500 rounded-md cursor-pointer"></div>
                      <div className="h-8 w-full bg-teal-500 rounded-md cursor-pointer"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="border border-border p-3 rounded-md cursor-pointer">
                        <p className="text-sm text-center">Small</p>
                      </div>
                      <div className="border border-primary p-3 rounded-md cursor-pointer bg-muted/30">
                        <p className="text-sm text-center">Medium</p>
                      </div>
                      <div className="border border-border p-3 rounded-md cursor-pointer">
                        <p className="text-sm text-center">Large</p>
                      </div>
                    </div>
                  </div>

                  <Button>Save Appearance Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Debug Mode</p>
                      <p className="text-sm text-muted-foreground">Enable detailed error reporting</p>
                    </div>
                    <Switch
                      id="debugMode"
                      checked={debugMode}
                      onCheckedChange={setDebugMode}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Cache Management</p>
                      <p className="text-sm text-muted-foreground">Control how long data is cached</p>
                    </div>
                    <Button variant="outline">Clear Cache</Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency">Backup Frequency</Label>
                    <NativeSelect
                      id="backupFrequency"
                      defaultValue="weekly"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </NativeSelect>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apiKeys">API Key Management</Label>
                    <div className="p-4 border border-border rounded-md">
                      <p className="text-sm mb-2">Current API Key:</p>
                      <div className="flex gap-2">
                        <Input id="apiKey" value="••••••••••••••••••••••" readOnly />
                        <Button variant="outline">Regenerate</Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>System Maintenance</Label>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline">Export All Data</Button>
                      <Button variant="outline">Import Data</Button>
                      <Button variant="outline">Check for Updates</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};
