export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: string;
  priority: string;
}

export const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New order received",
    message:
      "You have received a new order #12345 from John Doe. The order contains 3 items worth $299.99.",
    time: "2 minutes ago",
    isRead: false,
    type: "order",
    priority: "high",
  },
  {
    id: 2,
    title: "Payment confirmed",
    message: "Payment for order #12344 has been confirmed. Amount: $199.50",
    time: "1 hour ago",
    isRead: false,
    type: "payment",
    priority: "medium",
  },
  {
    id: 3,
    title: "New user registered",
    message:
      "A new user 'jane.smith@email.com' has registered on your platform",
    time: "3 hours ago",
    isRead: true,
    type: "user",
    priority: "low",
  },
  {
    id: 4,
    title: "System update completed",
    message:
      "System maintenance has been completed successfully. All services are now running normally.",
    time: "1 day ago",
    isRead: false,
    type: "system",
    priority: "medium",
  },
  {
    id: 5,
    title: "Daily backup completed",
    message:
      "Daily backup has been completed successfully. 2.5GB of data backed up.",
    time: "2 days ago",
    isRead: true,
    type: "backup",
    priority: "low",
  },
  {
    id: 6,
    title: "Order cancelled",
    message:
      "Order #12340 has been cancelled by the customer. Refund has been processed.",
    time: "3 days ago",
    isRead: false,
    type: "order",
    priority: "medium",
  },
  {
    id: 7,
    title: "Payment failed",
    message:
      "Payment attempt for order #12339 has failed. Customer has been notified.",
    time: "4 days ago",
    isRead: true,
    type: "payment",
    priority: "high",
  },
  {
    id: 8,
    title: "User profile updated",
    message: "User 'admin@company.com' has updated their profile information.",
    time: "5 days ago",
    isRead: true,
    type: "user",
    priority: "low",
  },
];
