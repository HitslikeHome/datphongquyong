import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddUser, setShowAddUser] = useState(false);

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@uih.edu",
      role: "Student",
      status: "Active",
      lastLogin: "2025-01-20 09:15:00",
      totalBookings: 47,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      department: "Computer Science",
      joinDate: "2024-09-01"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      email: "m.chen@uih.edu",
      role: "Faculty",
      status: "Active",
      lastLogin: "2025-01-20 08:30:00",
      totalBookings: 89,
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      department: "Engineering",
      joinDate: "2020-08-15"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "e.rodriguez@uih.edu",
      role: "Staff",
      status: "Active",
      lastLogin: "2025-01-19 16:45:00",
      totalBookings: 23,
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      department: "Administration",
      joinDate: "2022-03-10"
    },
    {
      id: 4,
      name: "James Wilson",
      email: "j.wilson@uih.edu",
      role: "Student",
      status: "Inactive",
      lastLogin: "2025-01-15 14:20:00",
      totalBookings: 12,
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      department: "Business",
      joinDate: "2024-01-20"
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      email: "l.thompson@uih.edu",
      role: "Admin",
      status: "Active",
      lastLogin: "2025-01-20 10:00:00",
      totalBookings: 156,
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      department: "IT Services",
      joinDate: "2019-05-01"
    },
    {
      id: 6,
      name: "David Park",
      email: "d.park@uih.edu",
      role: "Student",
      status: "Pending",
      lastLogin: "Never",
      totalBookings: 0,
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      department: "Mathematics",
      joinDate: "2025-01-18"
    }
  ];

  const roleStats = [
    { role: 'Students', count: 2847, active: 2654, color: 'bg-blue-500' },
    { role: 'Faculty', count: 342, active: 318, color: 'bg-green-500' },
    { role: 'Staff', count: 156, active: 142, color: 'bg-purple-500' },
    { role: 'Admins', count: 12, active: 12, color: 'bg-red-500' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role.toLowerCase() === selectedRole.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || user.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-success/10 text-success';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      case 'pending':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-error/10 text-error';
      case 'faculty':
        return 'bg-success/10 text-success';
      case 'staff':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  const formatLastLogin = (loginTime) => {
    if (loginTime === 'Never') return 'Never';
    const date = new Date(loginTime);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleUserAction = (action, userId) => {
    console.log(`${action} user with ID: ${userId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header and Stats */}
      <div className="bg-card rounded-lg border border-border p-6 academic-shadow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">User Management</h2>
              <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
            </div>
          </div>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setShowAddUser(true)}
          >
            Add User
          </Button>
        </div>

        {/* Role Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {roleStats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
              <div className={`w-3 h-3 ${stat.color} rounded-full`}></div>
              <div>
                <div className="text-lg font-semibold text-foreground">{stat.count}</div>
                <div className="text-sm text-muted-foreground">{stat.role}</div>
                <div className="text-xs text-success">{stat.active} active</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <Input
              type="search"
              placeholder="Search users by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="faculty">Faculty</option>
            <option value="staff">Staff</option>
            <option value="admin">Admins</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-lg border border-border academic-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-foreground">User</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Role</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Last Login</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Bookings</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/30 academic-transition">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-foreground">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="text-xs text-muted-foreground">{user.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground">{formatLastLogin(user.lastLogin)}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-foreground">{user.totalBookings}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUserAction('view', user.id)}
                        className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md academic-transition"
                        title="View Details"
                      >
                        <Icon name="Eye" size={16} />
                      </button>
                      <button
                        onClick={() => handleUserAction('edit', user.id)}
                        className="p-1.5 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-md academic-transition"
                        title="Edit User"
                      >
                        <Icon name="Edit" size={16} />
                      </button>
                      <button
                        onClick={() => handleUserAction('delete', user.id)}
                        className="p-1.5 text-muted-foreground hover:text-error hover:bg-error/10 rounded-md academic-transition"
                        title="Delete User"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      <div className="bg-card rounded-lg border border-border p-4 academic-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Showing {filteredUsers.length} of {users.length} users
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Export Users
            </Button>
            <Button variant="outline" size="sm" iconName="Mail" iconPosition="left">
              Send Notification
            </Button>
            <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
              Bulk Actions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;