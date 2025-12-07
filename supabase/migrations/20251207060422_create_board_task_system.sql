/*
  # Task Board Management System

  1. New Tables
    - `boards` - Project boards
    - `task_groups` - Groups within boards (e.g., "Recruitment", "HR Tasks")
    - `custom_columns` - Custom columns for boards
    - `board_tasks` - Tasks within groups
    - `task_column_values` - Values for custom columns
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create boards table
CREATE TABLE IF NOT EXISTS boards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE boards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all boards"
  ON boards FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create boards"
  ON boards FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update boards"
  ON boards FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create task_groups table
CREATE TABLE IF NOT EXISTS task_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id uuid REFERENCES boards(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  color text DEFAULT '#9C27B0',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE task_groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all task groups"
  ON task_groups FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create task groups"
  ON task_groups FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update task groups"
  ON task_groups FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete task groups"
  ON task_groups FOR DELETE
  TO authenticated
  USING (true);

-- Create custom_columns table
CREATE TABLE IF NOT EXISTS custom_columns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id uuid REFERENCES boards(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  column_type text NOT NULL CHECK (column_type IN ('text', 'number', 'email', 'rating', 'priority', 'location', 'date', 'person', 'file', 'status')),
  order_index integer DEFAULT 0,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE custom_columns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all custom columns"
  ON custom_columns FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create custom columns"
  ON custom_columns FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update custom columns"
  ON custom_columns FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete custom columns"
  ON custom_columns FOR DELETE
  TO authenticated
  USING (true);

-- Create board_tasks table
CREATE TABLE IF NOT EXISTS board_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES task_groups(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  subtasks_count integer DEFAULT 0,
  subtasks_completed integer DEFAULT 0,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE board_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all board tasks"
  ON board_tasks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create board tasks"
  ON board_tasks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update board tasks"
  ON board_tasks FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete board tasks"
  ON board_tasks FOR DELETE
  TO authenticated
  USING (true);

-- Create task_column_values table
CREATE TABLE IF NOT EXISTS task_column_values (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES board_tasks(id) ON DELETE CASCADE NOT NULL,
  column_id uuid REFERENCES custom_columns(id) ON DELETE CASCADE NOT NULL,
  value jsonb DEFAULT '{}',
  updated_at timestamptz DEFAULT now(),
  UNIQUE(task_id, column_id)
);

ALTER TABLE task_column_values ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all task column values"
  ON task_column_values FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create task column values"
  ON task_column_values FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update task column values"
  ON task_column_values FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete task column values"
  ON task_column_values FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_task_groups_board_id ON task_groups(board_id);
CREATE INDEX IF NOT EXISTS idx_custom_columns_board_id ON custom_columns(board_id);
CREATE INDEX IF NOT EXISTS idx_board_tasks_group_id ON board_tasks(group_id);
CREATE INDEX IF NOT EXISTS idx_task_column_values_task_id ON task_column_values(task_id);
CREATE INDEX IF NOT EXISTS idx_task_column_values_column_id ON task_column_values(column_id);
