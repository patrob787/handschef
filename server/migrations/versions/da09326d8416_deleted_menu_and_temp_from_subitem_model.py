"""deleted menu and temp from subitem model

Revision ID: da09326d8416
Revises: 43e1b3d879e8
Create Date: 2023-06-15 14:33:03.090838

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'da09326d8416'
down_revision = '43e1b3d879e8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sub_items', schema=None) as batch_op:
        batch_op.drop_column('menu')
        batch_op.drop_column('temperature')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sub_items', schema=None) as batch_op:
        batch_op.add_column(sa.Column('temperature', sa.BOOLEAN(), nullable=True))
        batch_op.add_column(sa.Column('menu', sa.VARCHAR(), nullable=False))

    # ### end Alembic commands ###
