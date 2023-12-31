"""changed POS name to Button name in Item and SubItem

Revision ID: 29bb35bfb675
Revises: da09326d8416
Create Date: 2023-06-15 15:12:27.286855

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '29bb35bfb675'
down_revision = 'da09326d8416'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.add_column(sa.Column('button_name', sa.String(), nullable=False))
        batch_op.drop_column('pos_name')

    with op.batch_alter_table('sub_items', schema=None) as batch_op:
        batch_op.add_column(sa.Column('button_name', sa.String(), nullable=False))
        batch_op.drop_column('pos_name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sub_items', schema=None) as batch_op:
        batch_op.add_column(sa.Column('pos_name', sa.VARCHAR(), nullable=False))
        batch_op.drop_column('button_name')

    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.add_column(sa.Column('pos_name', sa.VARCHAR(), nullable=False))
        batch_op.drop_column('button_name')

    # ### end Alembic commands ###
