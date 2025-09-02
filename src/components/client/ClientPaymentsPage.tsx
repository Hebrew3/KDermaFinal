import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import {
  CreditCard,
  Download,
  Calendar,
  ChevronDown,
  ChevronUp,
  Filter,
  Plus,
  FileText,
  CircleDollarSign,
  ShieldCheck,
  Wallet,
  Eye
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { CURRENCY_SYMBOL, formatCurrency } from '../utils/currency';

// Sample payment data
const invoices = [
  {
    id: 'INV-2025-001',
    date: '2025-05-01',
    amount: 85,
    service: 'Advanced Facial Treatment',
    status: 'Paid',
    paymentMethod: 'Credit Card (**** 5678)'
  },
  {
    id: 'INV-2025-002',
    date: '2025-04-15',
    amount: 150,
    service: 'Anti-Aging Treatments',
    status: 'Paid',
    paymentMethod: 'Credit Card (**** 5678)'
  },
  {
    id: 'INV-2025-003',
    date: '2025-03-20',
    amount: 65,
    service: 'Skin Analysis & Consultation',
    status: 'Paid',
    paymentMethod: 'PayPal'
  },
  {
    id: 'INV-2025-004',
    date: '2025-02-12',
    amount: 95,
    service: 'Hydrating Skin Therapy',
    status: 'Paid',
    paymentMethod: 'Credit Card (**** 5678)'
  }
];

// Sample payment methods
const paymentMethods = [
  {
    id: 1,
    type: 'Credit Card',
    cardType: 'Visa',
    lastFour: '5678',
    expiryDate: '04/27',
    isDefault: true
  },
  {
    id: 2,
    type: 'Credit Card',
    cardType: 'Mastercard',
    lastFour: '9012',
    expiryDate: '11/26',
    isDefault: false
  },
  {
    id: 3,
    type: 'PayPal',
    email: 'client@example.com',
    isDefault: false
  }
];

export const ClientPaymentsPage = () => {
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false);
  
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Payments & Billing</h1>
        <Button onClick={() => setShowAddPaymentDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </div>
      
      {/* Payment summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold">
                {CURRENCY_SYMBOL}{invoices.reduce((sum, invoice) => sum + invoice.amount, 0)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Lifetime</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <div className="flex items-center justify-center h-6 w-6 text-primary font-semibold">
                ₱
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Payment</p>
              <p className="text-2xl font-bold">{CURRENCY_SYMBOL}{invoices[0]?.amount || 0}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {invoices[0]?.date ? new Date(invoices[0].date).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Payment Methods</p>
              <p className="text-2xl font-bold">{paymentMethods.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Active methods</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="payment-methods" className="space-y-6">
        <TabsList>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="invoices">Invoices & Receipts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="payment-methods">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Your Payment Methods</span>
                <Button variant="outline" size="sm" onClick={() => setShowAddPaymentDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border/30 rounded-lg"
                  >
                    <div className="flex items-center mb-3 sm:mb-0">
                      <div className="rounded-full bg-muted p-2 mr-3">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        {method.type === 'Credit Card' ? (
                          <>
                            <p className="font-medium">
                              {method.cardType} •••• {method.lastFour}
                              {method.isDefault && (
                                <Badge variant="outline" className="ml-2">Default</Badge>
                              )}
                            </p>
                            <p className="text-sm text-muted-foreground">Expires: {method.expiryDate}</p>
                          </>
                        ) : (
                          <>
                            <p className="font-medium">
                              PayPal Account
                              {method.isDefault && (
                                <Badge variant="outline" className="ml-2">Default</Badge>
                              )}
                            </p>
                            <p className="text-sm text-muted-foreground">{method.email}</p>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {!method.isDefault && (
                        <Button variant="outline" size="sm">Set as Default</Button>
                      )}
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-muted/30 p-4 rounded-lg flex items-start">
                <ShieldCheck className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Secure Payment Processing</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    All payment information is encrypted and securely stored. We never store your full 
                    card details on our servers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Invoices & Payment History</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left font-medium p-3">Invoice</th>
                      <th className="text-left font-medium p-3">Date</th>
                      <th className="text-left font-medium p-3">Service</th>
                      <th className="text-left font-medium p-3">Amount</th>
                      <th className="text-left font-medium p-3">Status</th>
                      <th className="text-left font-medium p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-border/30 last:border-0 hover:bg-muted/20">
                        <td className="p-3 font-medium">{invoice.id}</td>
                        <td className="p-3">{new Date(invoice.date).toLocaleDateString()}</td>
                        <td className="p-3">{invoice.service}</td>
                        <td className="p-3">{formatCurrency(invoice.amount)}</td>
                        <td className="p-3">
                          <Badge variant={invoice.status === 'Paid' ? 'default' : 'outline'}>
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-3 w-3" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="mr-2 h-3 w-3" />
                              Download
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {invoices.length === 0 && (
                <div className="text-center py-10">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="mt-4 font-medium">No invoices found</h3>
                  <p className="text-muted-foreground mt-1">
                    You don't have any invoices in your payment history yet.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Payment Method Dialog */}
      <Dialog open={showAddPaymentDialog} onOpenChange={setShowAddPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="**** **** **** ****" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiry">Expiration Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="***" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name on Card</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="default-method" 
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <Label htmlFor="default-method" className="cursor-pointer">
                Set as default payment method
              </Label>
            </div>
            <div className="flex items-center bg-muted/30 p-3 rounded-md">
              <ShieldCheck className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Your payment information is securely encrypted and stored.
              </p>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowAddPaymentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAddPaymentDialog(false)}>
              Save Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};