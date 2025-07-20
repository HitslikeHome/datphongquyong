import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SpaceManagement = ({ spaces, onSpaceAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.building.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || space.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'Conference Room': return 'text-primary bg-primary/10';
      case 'Classroom': return 'text-success bg-success/10';
      case 'Lab': return 'text-accent bg-accent/10';
      case 'Study Room': return 'text-secondary bg-secondary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'text-success bg-success/10';
      case 'Occupied': return 'text-warning bg-warning/10';
      case 'Maintenance': return 'text-error bg-error/10';
      case 'Reserved': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Space Management</h2>
          <Button variant="default" onClick={() => onSpaceAction('add-space')}>
            <Icon name="Plus" size={16} className="mr-2" />
            Add Space
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search spaces by name or building..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Types</option>
              <option value="Conference Room">Conference Room</option>
              <option value="Classroom">Classroom</option>
              <option value="Lab">Lab</option>
              <option value="Study Room">Study Room</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Space</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Utilization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredSpaces.map((space) => (
              <tr key={space.id} className="hover:bg-muted/50 transition-smooth">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                      <Icon name="MapPin" size={14} color="white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{space.name}</div>
                      <div className="text-xs text-muted-foreground">{space.building} - {space.floor}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(space.type)}`}>
                    {space.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{space.capacity}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(space.status)}`}>
                    {space.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-smooth" 
                        style={{ width: `${space.utilization}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{space.utilization}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => onSpaceAction('edit', space.id)}>
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onSpaceAction('view', space.id)}>
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onSpaceAction('settings', space.id)}>
                      <Icon name="Settings" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredSpaces.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No spaces found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default SpaceManagement;